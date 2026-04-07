import jwt from "jsonwebtoken"
import crypto from "crypto"

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "dev_secret"

interface AccessTokenPayload {
  userId: string
}

export function generateAccessToken(userId: string): string {
  const payload: AccessTokenPayload = {
    userId,
  }

  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  })
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  return jwt.verify(token, ACCESS_TOKEN_SECRET) as AccessTokenPayload
}

export function generateRefreshToken(): string {
  return crypto.randomBytes(64).toString("hex")
}
