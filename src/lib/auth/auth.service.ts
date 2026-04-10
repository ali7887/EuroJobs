import bcrypt from "bcryptjs"
import crypto from "crypto"
import { userService } from "@/modules/users/user.service"
import { TokenRepository } from "./token.service"

function generateToken() {
  return crypto.randomBytes(32).toString("hex")
}

function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex")
}

export const authService = {

  async register(data: {
    email: string
    password: string
    name: string
  }) {

    const user = await userService.createUser({
      email: data.email,
      password: data.password,
      name: data.name
    })

    const tokens = await this.createTokens(user.id)

    return { user, tokens }
  },


  async login(data: {
    email: string
    password: string
  }) {

    const user = await userService.findByEmail(data.email)

    if (!user)
      throw new Error("User not found")

    const valid = await userService.comparePassword(
      data.password,
      user.passwordHash
    )

    if (!valid)
      throw new Error("Invalid password")

    const tokens = await this.createTokens(user.id)

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      tokens
    }
  },


  async refresh(refreshToken: string) {

  const tokenHash = hashToken(refreshToken)

  const stored = await TokenRepository.findByHash(tokenHash)

  if (!stored || stored.isRevoked || !stored.userId)
    throw new Error("Invalid refresh token")

  const tokens = await this.createTokens(stored.userId)

  await TokenRepository.revoke(stored.id)

  return tokens
}
,


  async createTokens(userId: number) {

    const accessToken = generateToken()
    const refreshToken = generateToken()

    const tokenHash = hashToken(refreshToken)

    await TokenRepository.store({
      userId,
      tokenHash,
      isRevoked: false,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    })

    return {
      accessToken,
      refreshToken
    }
  }
}
