import { db } from "@/lib/db";
import { users, refreshTokens } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  signResetPasswordToken,
  verifyResetPasswordToken,
  signEmailVerificationToken
} from "@/lib/jwt/jwt.utils";

import type { UserRole } from "@/lib/jwt/jwt.types";
export const runtime = "nodejs";

export const authService = {

  async register({
    email,
    password,
    name
  }: {
    email: string
    password: string
    name?: string
  }) {

    const existing = await db.query.users.findFirst({
      where: eq(users.email, email)
    })

    if (existing) {
      throw new Error("User already exists")
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const inserted = await db.insert(users).values({
      email,
      name,
      passwordHash,
      role: "user"
    }).returning()

    const user = inserted[0]

    const accessToken = await signAccessToken({
      userId: user.id,
      email: user.email,
      role: (user.role as UserRole) ?? "user"
    })

    const refreshId = uuidv4()

    const refreshToken = await signRefreshToken({
      tokenId: refreshId,
      userId: user.id
    })

    await db.insert(refreshTokens).values({
      userId: user.id,
      token: refreshId,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      revoked: false
    })

    return {
      user,
      accessToken,
      refreshToken
    }
  },

  async login({
    email,
    password
  }: {
    email: string
    password: string
  }) {

    const user = await db.query.users.findFirst({
      where: eq(users.email, email)
    })

    if (!user || !user.passwordHash) {
      throw new Error("Invalid credentials")
    }

    const valid = await bcrypt.compare(password, user.passwordHash)

    if (!valid) {
      throw new Error("Invalid credentials")
    }

    const accessToken = await signAccessToken({
      userId: user.id,
      email: user.email,
      role: (user.role as UserRole) ?? "user"
    })

    const refreshId = uuidv4()

    const refreshToken = await signRefreshToken({
      tokenId: refreshId,
      userId: user.id
    })

    await db.insert(refreshTokens).values({
      userId: user.id,
      token: refreshId,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      revoked: false
    })

    return {
      user,
      accessToken,
      refreshToken
    }
  },

  async logout(refreshToken: string) {

    const payload = await verifyRefreshToken(refreshToken)

    await db
      .update(refreshTokens)
      .set({ revoked: true })
      .where(eq(refreshTokens.token, payload.tokenId))

    return { success: true }
  },

  async sendPasswordResetEmail(email: string) {

    const user = await db.query.users.findFirst({
      where: eq(users.email, email)
    })

    if (!user) {
      throw new Error("User not found")
    }

    const token = await signResetPasswordToken({
      userId: user.id,
      email: user.email
    })

    return { token }
  },

  async resetPassword(token: string, newPassword: string) {

    const payload = await verifyResetPasswordToken(token)

    const hash = await bcrypt.hash(newPassword, 10)

    await db.update(users)
      .set({ passwordHash: hash })
      .where(eq(users.id, payload.userId))

    return { success: true }
  },

  async sendVerificationEmail(userId: number) {

    const user = await db.query.users.findFirst({
      where: eq(users.id, userId)
    })

    if (!user) throw new Error("User not found")

    const token = await signEmailVerificationToken({
      userId: user.id,
      email: user.email
    })

    return { token }
  }
}
