import { SignJWT, jwtVerify } from "jose";
import type {
  AccessTokenPayload,
  RefreshTokenPayload,
} from "@/lib/types/token.types";

function getSecret(secret: string) {
  return new TextEncoder().encode(secret);
}

const ACCESS_SECRET = process.env.JWT_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
const ACCESS_EXPIRY = "15m";
const REFRESH_EXPIRY = "7d";

/* ============================
   TYPE GUARDS (SAFE)
============================ */

function isAccessPayload(payload: any): payload is AccessTokenPayload {
  return (
    payload &&
    typeof payload.sub === "string" &&
    typeof payload.userId === "string" &&
    typeof payload.role === "string" &&
    payload.type === "access"
  );
}

function isRefreshPayload(payload: any): payload is RefreshTokenPayload {
  return (
    payload &&
    typeof payload.tokenId === "string" &&
    typeof payload.userId === "string" &&
    payload.type === "refresh"
  );
}

/* ============================
   ACCESS TOKEN
============================ */

export async function signAccessToken(
  payload: Omit<AccessTokenPayload, "type">
) {
  return new SignJWT({ ...payload, type: "access" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(ACCESS_EXPIRY)
    .sign(getSecret(ACCESS_SECRET));
}

export async function verifyAccessToken(
  token: string
): Promise<AccessTokenPayload> {
  const { payload } = await jwtVerify(token, getSecret(ACCESS_SECRET));

  if (!isAccessPayload(payload)) {
    throw new Error("Invalid access token payload");
  }

  return payload;
}

/* ============================
   REFRESH TOKEN
============================ */

export async function signRefreshToken(
  payload: Omit<RefreshTokenPayload, "type">
) {
  return new SignJWT({ ...payload, type: "refresh" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(REFRESH_EXPIRY)
    .sign(getSecret(REFRESH_SECRET));
}

export async function verifyRefreshToken(
  token: string
): Promise<RefreshTokenPayload> {
  const { payload } = await jwtVerify(token, getSecret(REFRESH_SECRET));

  if (!isRefreshPayload(payload)) {
    throw new Error("Invalid refresh token payload");
  }

  return payload;
}

/* ============================
   RESET TOKEN
============================ */

export async function signResetToken(payload: { userId: string }) {
  return new SignJWT({ ...payload, type: "reset" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(getSecret(ACCESS_SECRET));
}

export async function verifyResetToken(
  token: string
): Promise<{ userId: string }> {
  const { payload } = await jwtVerify(token, getSecret(ACCESS_SECRET));

  if (!payload || typeof payload.userId !== "string") {
    throw new Error("Invalid reset token payload");
  }

  return { userId: payload.userId };
}
