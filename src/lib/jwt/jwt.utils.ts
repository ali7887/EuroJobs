// src/lib/jwt/jwt.utils.ts
import jwt from 'jsonwebtoken'
import { env } from '@/lib/env'
import type { AccessTokenPayload, RefreshTokenPayload } from './jwt.types'

// Access token — کوتاه‌مدت
export function signAccessToken(payload: Omit<AccessTokenPayload, 'type'>): string {
  return jwt.sign(
    { ...payload, type: 'access' },
    env.JWT_SECRET,
    { expiresIn: '15m' }
  )
}

// Refresh token — بلندمدت
export function signRefreshToken(payload: Omit<RefreshTokenPayload, 'type'>): string {
  return jwt.sign(
    { ...payload, type: 'refresh' },
    env.JWT_REFRESH_SECRET,   // secret جداگانه برای refresh
    { expiresIn: '7d' }
  )
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  return jwt.verify(token, env.JWT_SECRET) as AccessTokenPayload
}

export function verifyRefreshToken(token: string): RefreshTokenPayload {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as RefreshTokenPayload
}
