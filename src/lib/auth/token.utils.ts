import { SignJWT, jwtVerify, JWTPayload } from "jose"

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "dev-secret"
)

export interface AccessTokenPayload extends JWTPayload {
  userId: number
}

export async function generateAccessToken(payload: AccessTokenPayload) {

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(secret)
}

export async function verifyAccessToken(token: string): Promise<AccessTokenPayload> {

  const { payload } = await jwtVerify(token, secret)

  return payload as unknown as AccessTokenPayload
}
