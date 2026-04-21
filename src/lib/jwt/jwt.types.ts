export type UserRole = 'admin' | 'employer' | 'candidate' | 'user';

export interface AccessTokenPayload {
  userId: number;
  email: string;
  role: UserRole;
  type: 'access';
  [key: string]: unknown;
}

export interface RefreshTokenPayload {
  tokenId: string;
  userId: number;
  type: 'refresh';
  [key: string]: unknown;
}

export interface ResetPasswordTokenPayload {
  userId: number;
  email: string;
  type: 'reset';
  iat?: number;
  exp?: number;
  [key: string]: unknown;
}

export interface EmailVerifyTokenPayload {
  userId: number;
  email: string;
  type: 'email-verify';
  iat?: number;
  exp?: number;
  [key: string]: unknown;
}

export interface StoredRefreshToken {
  id: string;
  userId: number;
  tokenHash: string;
  expiresAt: string;
  createdAt: string;
  isRevoked: boolean;
}
