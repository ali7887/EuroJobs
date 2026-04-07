// src/lib/jwt/jwt.utils.ts
import { SignJWT, jwtVerify } from 'jose';
import type { AccessTokenPayload, RefreshTokenPayload } from '@/lib/types/token.types';

// ✅ jose نیاز به Uint8Array دارد
function getSecret(secret: string): Uint8Array {
  return new TextEncoder().encode(secret);
}

const ACCESS_SECRET  = process.env.JWT_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
const ACCESS_EXPIRY  = '15m';
const REFRESH_EXPIRY = '7d';

export async function signAccessToken(payload: Omit<AccessTokenPayload, 'type'>): Promise<string> {
  return new SignJWT({ ...payload, type: 'access' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(ACCESS_EXPIRY)
    .sign(getSecret(ACCESS_SECRET));
}

export async function signRefreshToken(payload: Omit<RefreshTokenPayload, 'type'>): Promise<string> {
  return new SignJWT({ ...payload, type: 'refresh' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(REFRESH_EXPIRY)
    .sign(getSecret(REFRESH_SECRET));
}

export async function verifyAccessToken(token: string): Promise<AccessTokenPayload> {
  const { payload } = await jwtVerify(token, getSecret(ACCESS_SECRET));
  return payload as unknown as AccessTokenPayload;
}

export async function verifyRefreshToken(token: string): Promise<RefreshTokenPayload> {
  const { payload } = await jwtVerify(token, getSecret(REFRESH_SECRET));
  return payload as unknown as RefreshTokenPayload;
}
