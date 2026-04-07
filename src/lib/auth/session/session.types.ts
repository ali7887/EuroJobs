export interface Session {

  id: string

  userId: string

  refreshTokenHash: string

  userAgent?: string

  ip?: string

  createdAt: string

  expiresAt: string

}
