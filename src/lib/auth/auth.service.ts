import bcrypt from "bcryptjs"
import crypto from "crypto"

import { db } from "@/lib/db/db"

import { sessionService } from "./session/session.service"
import { hashToken } from "./session/session.utils"

import {
  generateAccessToken,
  generateRefreshToken,
} from "./token.utils"

import type { User, UserRole, SafeUser } from "@/lib/db/schema"

export interface RegisterInput {
  email: string
  password: string
  name?: string
}

export interface LoginInput {
  email: string
  password: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

class AuthService {

  // =========================
  // REGISTER
  // =========================

  async register(input: RegisterInput) {
    const { email, password, name } = input

    const existing = db.data.users.find(
      (u) => u.email === email
    )

    if (existing) {
      throw new Error("Email already exists")
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const now = new Date().toISOString()

    const user: User = {
      id: crypto.randomUUID(),
      email,
      passwordHash,
      name: name ?? "",
      role: "jobseeker" as UserRole,
      createdAt: now,
      updatedAt: now,
    }

    db.data.users.push(user)
    await db.write()

    const tokens = await this.createTokensAndSession(user.id)

    const safeUser: SafeUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }

    return {
      user: safeUser,
      tokens: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken
      }
    }
  }

  // =========================
  // LOGIN
  // =========================

  async login(input: LoginInput) {
    const { email, password } = input

    const user = db.data.users.find(
      (u) => u.email === email
    )

    if (!user) {
      throw new Error("Invalid credentials")
    }

    const valid = await bcrypt.compare(
      password,
      user.passwordHash
    )

    if (!valid) {
      throw new Error("Invalid credentials")
    }

    const tokens = await this.createTokensAndSession(user.id)

    const safeUser: SafeUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }

    return {
      user: safeUser,
      tokens: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken
      }
    }
  }

  // =========================
  // TOKEN CREATION
  // =========================

  private async createTokensAndSession(
    userId: string
  ): Promise<AuthTokens> {

    const accessToken = generateAccessToken(userId)
    const refreshToken = generateRefreshToken()

    const tokenHash = hashToken(refreshToken)

    await sessionService.createSession(
      userId,
      refreshToken
    )

    return {
      accessToken,
      refreshToken,
    }
  }

  // =========================
  // LOGOUT
  // =========================

  async logout(refreshToken: string) {

    const tokenHash = hashToken(refreshToken)

    const session =
      await sessionService.findSessionByToken(tokenHash)

    if (!session) {
      return { success: true }
    }

    await sessionService.deleteSession(session.id)

    return { success: true }
  }

  // =========================
  // REFRESH TOKEN
  // =========================

  async refresh(refreshToken: string) {

    const tokenHash = hashToken(refreshToken)

    const session =
      await sessionService.findSessionByToken(tokenHash)

    if (!session) {
      throw new Error("Invalid refresh token")
    }

    await sessionService.deleteSession(session.id)

    return this.createTokensAndSession(session.userId)
  }
}

export const authService = new AuthService()
