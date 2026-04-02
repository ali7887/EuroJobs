// src/lib/jwt/jwt.types.ts

export interface AccessTokenPayload {
  userId: string
  role: string
  type: 'access'
}

export interface RefreshTokenPayload {
  tokenId: string   // ID منحصربه‌فرد این refresh token
  userId: string
  type: 'refresh'
}

export interface StoredRefreshToken {
  id: string
  userId: string
  tokenHash: string    // هش refresh token — نه plaintext
  expiresAt: string
  createdAt: string
  isRevoked: boolean
}
