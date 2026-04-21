import { SignJWT, jwtVerify, JWTPayload } from "jose";
import type {
  AccessTokenPayload,
  RefreshTokenPayload,
  ResetPasswordTokenPayload,
  EmailVerifyTokenPayload,
  UserRole,
} from "./jwt.types";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-development-key";
const JWT_RESET_SECRET = process.env.JWT_RESET_SECRET || "super-secret-reset-key";
const JWT_EMAIL_VERIFY_SECRET =
  process.env.JWT_EMAIL_VERIFY_SECRET || "super-secret-email-verify-key";

const accessSecret = new TextEncoder().encode(JWT_SECRET);
const resetSecret = new TextEncoder().encode(JWT_RESET_SECRET);
const emailVerifySecret = new TextEncoder().encode(JWT_EMAIL_VERIFY_SECRET);

const ACCESS_TOKEN_EXPIRES = "15m";
const REFRESH_TOKEN_EXPIRES = "30d";
const RESET_TOKEN_EXPIRES = "15m";
const EMAIL_VERIFY_EXPIRES = "30m";

// ---------------- Access Token ----------------

export async function signAccessToken(payload: {
  userId: number;
  email: string;
  role: UserRole;
}): Promise<string> {
  const tokenPayload: AccessTokenPayload = { ...payload, type: "access" };
  return await new SignJWT(tokenPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(ACCESS_TOKEN_EXPIRES)
    .sign(accessSecret);
}

export async function verifyAccessToken(token: string): Promise<AccessTokenPayload> {
  try {
    const { payload } = await jwtVerify(token, accessSecret);
    if (
      typeof payload.userId !== "number" ||
      typeof payload.email !== "string" ||
      typeof payload.role !== "string" ||
      payload.type !== "access"
    ) {
      throw new Error("Invalid access token payload");
    }
    return payload as AccessTokenPayload;
  } catch (err) {
    console.error("Access token verification failed:", err);
    throw new Error("Invalid or expired access token");
  }
}

// ---------------- Refresh Token ----------------

export async function signRefreshToken(payload: {
  tokenId: string;
  userId: number;
}): Promise<string> {
  const tokenPayload: RefreshTokenPayload = { ...payload, type: "refresh" };
  return await new SignJWT(tokenPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(REFRESH_TOKEN_EXPIRES)
    .sign(accessSecret);
}

export async function verifyRefreshToken(token: string): Promise<RefreshTokenPayload> {
  try {
    const { payload } = await jwtVerify(token, accessSecret);
    if (
      typeof payload.tokenId !== "string" ||
      typeof payload.userId !== "number" ||
      payload.type !== "refresh"
    ) {
      throw new Error("Invalid refresh token payload structure");
    }
    return payload as RefreshTokenPayload;
  } catch (error) {
    console.error("Refresh token verification failed:", error);
    throw new Error("Invalid or expired refresh token");
  }
}

// ---------------- Reset Password Token ----------------

export async function signResetPasswordToken(payload: {
  userId: number;
  email: string;
}): Promise<string> {
  const tokenPayload: ResetPasswordTokenPayload = { ...payload, type: "reset" };
  return await new SignJWT(tokenPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(RESET_TOKEN_EXPIRES)
    .sign(resetSecret);
}

export async function verifyResetPasswordToken(
  token: string
): Promise<ResetPasswordTokenPayload> {
  try {
    const { payload } = await jwtVerify(token, resetSecret);
    if (
      typeof payload.userId !== "number" ||
      typeof payload.email !== "string" ||
      payload.type !== "reset"
    ) {
      throw new Error("Invalid reset token payload");
    }
    return payload as ResetPasswordTokenPayload;
  } catch (error) {
    console.error("Reset token verification failed:", error);
    throw new Error("Invalid or expired reset password token");
  }
}

// ---------------- Email Verification Token ----------------

export async function signEmailVerificationToken(payload: {
  userId: number;
  email: string;
}): Promise<string> {
  const tokenPayload: EmailVerifyTokenPayload = { ...payload, type: "email-verify" };
  return await new SignJWT(tokenPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(EMAIL_VERIFY_EXPIRES)
    .sign(emailVerifySecret);
}

export async function verifyEmailVerificationToken(
  token: string
): Promise<EmailVerifyTokenPayload> {
  try {
    const { payload } = await jwtVerify(token, emailVerifySecret);
    if (
      typeof payload.userId !== "number" ||
      typeof payload.email !== "string" ||
      payload.type !== "email-verify"
    ) {
      throw new Error("Invalid email verification token payload structure");
    }
    return payload as EmailVerifyTokenPayload;
  } catch (error) {
    console.error("Email verification token verification failed:", error);
    throw new Error("Invalid or expired email verification token");
  }
}
