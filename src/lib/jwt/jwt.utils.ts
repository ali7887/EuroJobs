import { SignJWT, jwtVerify } from "jose";
import type { AccessTokenPayload } from "./jwt.types";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "dev-secret"
);

const ACCESS_TOKEN_EXPIRES = "15m";
const RESET_TOKEN_EXPIRES = "10m";

/**
 * Sign Access Token
 */
export async function signAccessToken(
  payload: Omit<AccessTokenPayload, "type">
) {
  return await new SignJWT({
    ...payload,
    type: "access",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(ACCESS_TOKEN_EXPIRES)
    .sign(secret);
}

/**
 * Verify Access Token
 */
export async function verifyAccessToken(
  token: string
): Promise<AccessTokenPayload> {
  const { payload } = await jwtVerify(token, secret);

  if (
    !payload ||
    typeof payload.userId !== "string" ||
    typeof payload.role !== "string" ||
    payload.type !== "access"
  ) {
    throw new Error("Invalid access token payload");
  }

  return payload as unknown as AccessTokenPayload;
}

/**
 * Sign Reset Password Token
 */
export async function signResetToken(payload: { userId: string }) {
  return await new SignJWT({
    ...payload,
    type: "reset",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(RESET_TOKEN_EXPIRES)
    .sign(secret);
}

/**
 * Verify Reset Password Token
 */
export async function verifyResetToken(token: string) {
  const { payload } = await jwtVerify(token, secret);

  if (
    !payload ||
    typeof payload.userId !== "string" ||
    payload.type !== "reset"
  ) {
    throw new Error("Invalid reset token");
  }

  return payload as { userId: string; type: "reset" };
}
// --------------------------
// Refresh Token
// --------------------------
export async function signRefreshToken(payload: { userId: number }) {
  return await new SignJWT({ ...payload, type: "refresh" })
    .setExpirationTime("30d")
    .setProtectedHeader({ alg: "HS256" })
    .sign(new TextEncoder().encode(process.env.JWT_SECRET!));
}

export async function verifyRefreshToken(token: string) {
  const { payload } = await jwtVerify(
    token,
    new TextEncoder().encode(process.env.JWT_SECRET!)
  );

  if (payload.type !== "refresh") {
    throw new Error("Invalid token type");
  }

  return payload as { userId: number };
}
