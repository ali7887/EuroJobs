export type UserRole = 'admin' | 'employer' | 'candidate' | 'user';

export interface AccessTokenPayload {
  userId: string;
  email: string;
  role: UserRole;
  type: 'access';
  [key: string]: unknown;
}

export interface RefreshTokenPayload {
  tokenId: string;
  userId: string;
  type: 'refresh';
  [key: string]: unknown;
}

export interface ResetPasswordTokenPayload {
  userId: string;
  email: string;
  type: 'reset';
  iat?: number;
  exp?: number;
  [key: string]: unknown;
}

export interface EmailVerifyTokenPayload {
  userId: string;
  email: string;
  type: 'email-verify';
  iat?: number;
  exp?: number;
  [key: string]: unknown;
}

export interface StoredRefreshToken {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: string;
  createdAt: string;
  isRevoked: boolean;
}
