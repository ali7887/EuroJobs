export interface AccessTokenPayload {
  userId: string;
  role: string;
  type: 'access';
}

export interface RefreshTokenPayload {
  tokenId: string;
  userId: string;
  type: 'refresh';
}

export interface StoredRefreshToken {
  isRevoked: any;
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: string;
  createdAt: string;
  revokedAt?: string;
  replacedByTokenId?: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}
