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
  id: string;
  userId: string;
  tokenHash: string;       // هرگز raw token ذخیره نمی‌شود
  expiresAt: string;       // ISO 8601
  createdAt: string;
  revokedAt?: string;      // اگر revoke شد
  replacedByTokenId?: string; // برای rotation chain
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}
