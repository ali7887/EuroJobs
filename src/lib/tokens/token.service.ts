import crypto from 'crypto'
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from '@/lib/jwt/jwt.utils'
import {
  storeRefreshToken,
  findRefreshToken,
  revokeToken,
  revokeAllUserTokens,
  verifyTokenHash,
} from './token.repository'
import { findById } from '@/modules/users/user.repository'

export interface TokenPair {
  accessToken: string
  refreshToken: string
}

export async function issueTokenPair(
  userId: string,
  role: string
): Promise<TokenPair> {
  const tokenId = crypto.randomUUID()

  const accessToken = signAccessToken({ userId, role })
  const refreshToken = signRefreshToken({ tokenId, userId })

  await storeRefreshToken(tokenId, userId, refreshToken)

  return { accessToken, refreshToken }
}

export async function rotateRefreshToken(
  rawRefreshToken: string
): Promise<TokenPair> {
  
  let payload
  try {
    payload = verifyRefreshToken(rawRefreshToken)
  } catch {
    throw new Error('INVALID_TOKEN')
  }

  const stored = await findRefreshToken(payload.tokenId)
  
  if (!stored) {
    throw new Error('TOKEN_NOT_FOUND')
  }

  if (stored.isRevoked) {
    await revokeAllUserTokens(stored.userId)
    throw new Error('TOKEN_REUSE_DETECTED')
  }

  if (new Date(stored.expiresAt) < new Date()) {
    await revokeToken(stored.id)
    throw new Error('TOKEN_EXPIRED')
  }

  if (!verifyTokenHash(rawRefreshToken, stored.tokenHash)) {
    throw new Error('TOKEN_HASH_MISMATCH')
  }

  await revokeToken(stored.id)

  // Get user role from DB
  const user = await findById(stored.userId)
  
  if (!user) {
    throw new Error('USER_NOT_FOUND')
  }

  return issueTokenPair(stored.userId, user.role)
}
