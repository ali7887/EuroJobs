import type { UserRole } from "@/lib/jwt/jwt.types";

import {
  signAccessToken,
  signRefreshToken,
  signResetPasswordToken,
  signEmailVerificationToken,
} from "@/lib/jwt/jwt.utils";

import { db } from "@/lib/db";
import { refreshTokens, User } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";

export async function loginUser(user: User) {
  const accessToken = await signAccessToken({
    userId: user.id,
    email: user.email,
    role: user.role as UserRole,
  });

  const refreshTokenId = crypto.randomUUID();
  const refreshToken = await signRefreshToken({
    tokenId: refreshTokenId,
    userId: user.id,
  });

  await db.insert(refreshTokens).values({
    id: crypto.randomUUID(),
    userId: user.id,
    tokenHash: refreshTokenId, // schema requires tokenHash
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    isRevoked: false,
  });

  return { accessToken, refreshToken };
}

export async function sendPasswordResetEmail(user: User) {
  return await signResetPasswordToken({
    userId: user.id,
    email: user.email,
  });
}

export async function sendVerificationEmail(user: User) {
  return await signEmailVerificationToken({
    userId: user.id,
    email: user.email,
  });
}

export const authService = {
  loginUser,
  sendPasswordResetEmail,
  sendVerificationEmail,
};
