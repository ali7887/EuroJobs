import { SignJWT, jwtVerify } from "jose";
import { getEnv } from "@/lib/env";


import type {
  AccessTokenPayload,
  RefreshTokenPayload,
  ResetPasswordTokenPayload,
  EmailVerifyTokenPayload,
  UserRole,
} from "./jwt.types";
import { env } from "node:process";

const accessSecret = new TextEncoder().encode(env.JWT_ACCESS_SECRET);

function getSecret(name: string): Uint8Array {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is not defined`);
  }

  return new TextEncoder().encode(value);
}

const ACCESS_TOKEN_EXPIRES = "15m";
const REFRESH_TOKEN_EXPIRES = "30d";
const RESET_TOKEN_EXPIRES = "15m";
const EMAIL_VERIFY_EXPIRES = "30m";

export async function signAccessToken(payload: {
  userId: number;
  email: string;
  role: UserRole;
}): Promise<string> {
  const tokenPayload: AccessTokenPayload = { ...payload, type: "access" };

  return new SignJWT(tokenPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(ACCESS_TOKEN_EXPIRES)
    .sign(getSecret("JWT_SECRET"));
}

export async function verifyAccessToken(
  token: string
): Promise<AccessTokenPayload> {
  const { payload } = await jwtVerify(token, getSecret("JWT_SECRET"));

  if (
    typeof payload.userId !== "number" ||
    typeof payload.email !== "string" ||
    typeof payload.role !== "string" ||
    payload.type !== "access"
  ) {
    throw new Error("Invalid access token payload");
  }

  return payload as AccessTokenPayload;
}

export async function signRefreshToken(payload: {
  tokenId: string;
  userId: number;
}): Promise<string> {
  const tokenPayload: RefreshTokenPayload = { ...payload, type: "refresh" };

  return new SignJWT(tokenPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(REFRESH_TOKEN_EXPIRES)
    .sign(getSecret("JWT_REFRESH_SECRET"));
}

export async function verifyRefreshToken(
  token: string
): Promise<RefreshTokenPayload> {
  const { payload } = await jwtVerify(token, getSecret("JWT_REFRESH_SECRET"));

  if (
    typeof payload.tokenId !== "string" ||
    typeof payload.userId !== "number" ||
    payload.type !== "refresh"
  ) {
    throw new Error("Invalid refresh token payload");
  }

  return payload as RefreshTokenPayload;
}

export async function signResetPasswordToken(payload: {
  userId: number;
  email: string;
}): Promise<string> {
  const tokenPayload: ResetPasswordTokenPayload = { ...payload, type: "reset" };

  return new SignJWT(tokenPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(RESET_TOKEN_EXPIRES)
    .sign(getSecret("JWT_RESET_SECRET"));
}

export async function verifyResetPasswordToken(
  token: string
): Promise<ResetPasswordTokenPayload> {
  const { payload } = await jwtVerify(token, getSecret("JWT_RESET_SECRET"));

  if (
    typeof payload.userId !== "number" ||
    typeof payload.email !== "string" ||
    payload.type !== "reset"
  ) {
    throw new Error("Invalid reset password token");
  }

  return payload as ResetPasswordTokenPayload;
}

export async function signEmailVerificationToken(payload: {
  userId: number;
  email: string;
}): Promise<string> {
  const tokenPayload: EmailVerifyTokenPayload = {
    ...payload,
    type: "email-verify",
  };

  return new SignJWT(tokenPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(EMAIL_VERIFY_EXPIRES)
    .sign(getSecret("JWT_EMAIL_VERIFY_SECRET"));
}

export async function verifyEmailVerificationToken(
  token: string
): Promise<EmailVerifyTokenPayload> {
  const { payload } = await jwtVerify(
    token,
    getSecret("JWT_EMAIL_VERIFY_SECRET")
  );

  if (
    typeof payload.userId !== "number" ||
    typeof payload.email !== "string" ||
    payload.type !== "email-verify"
  ) {
    throw new Error("Invalid email verification token");
  }

  return payload as EmailVerifyTokenPayload;
}
