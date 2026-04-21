import type { User } from "@/lib/db/schema";
import type { UserRole } from "@/lib/jwt/jwt.types";

import {
  signAccessToken,
  signRefreshToken,
  signResetPasswordToken,
  signEmailVerificationToken
} from "@/lib/jwt/jwt.utils";

import { db } from "@/lib/db";
import { refreshTokens } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

import { v4 as uuidv4 } from "uuid";

export async function loginUser(user: User) {
  const accessToken = await signAccessToken({
    userId: user.id,
    email: user.email,
    role: user.role as UserRole,
  });

  const refreshTokenId = uuidv4();
  const refreshToken = await signRefreshToken({
    tokenId: refreshTokenId,
    userId: user.id,
  });

  await db.insert(refreshTokens).values({
    userId: user.id,
    token: refreshTokenId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    revoked: false
  });

  return { accessToken, refreshToken };
}

export async function sendPasswordResetEmail(user: User) {
  const resetToken = await signResetPasswordToken({
    userId: user.id,
    email: user.email,
  });

  return resetToken;
}

export async function sendVerificationEmail(user: User) {
  const token = await signEmailVerificationToken({
    userId: user.id,
    email: user.email,
  });

  return token;
}

export const authService = {
  loginUser,
  sendPasswordResetEmail,
  sendVerificationEmail
};
