import crypto from "crypto"
import { userService } from "@/lib/services/user.service"
import { TokenRepository } from "@/lib/auth/token.repository"
import { generateAccessToken } from "./token.utils"


function generateToken() {
  return crypto.randomBytes(32).toString("hex")
}

function hashToken(token: string) {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex")
}

export const authService = {

  async register(data: {
    email: string
    password: string
    name: string
  }) {

    const user = await userService.register({
      email: data.email,
      password: data.password,
      name: data.name
    })

    const tokens = await this.createTokens(user.id)

    return {
      user,
      tokens
    }
  },

  async login(data: {
    email: string
    password: string
  }) {

    const user = await userService.verifyCredentials(
      data.email,
      data.password
    )

    const tokens = await this.createTokens(user.id)

    return {
      user,
      tokens
    }
  },

  async refresh(refreshToken: string) {

    const tokenHash = hashToken(refreshToken)

    const stored = await TokenRepository.findByHash(tokenHash)

    if (!stored || stored.isRevoked || !stored.userId) {
      throw new Error("Invalid refresh token")
    }

    const tokens = await this.createTokens(stored.userId)

    // revoke old refresh token
    await TokenRepository.revoke(stored.id)

    return tokens
  },

  async logout(refreshToken: string) {

    if (!refreshToken) return

    const tokenHash = hashToken(refreshToken)

    const stored = await TokenRepository.findByHash(tokenHash)

    if (!stored) return

    await TokenRepository.revoke(stored.id)
  },

  async logoutAll(userId: number) {

    await TokenRepository.revokeAllByUserId(userId)
  },

  async createTokens(userId: number) {

  const accessToken = await generateAccessToken({
    userId
  })

  const refreshToken = generateToken()

  const tokenHash = hashToken(refreshToken)

  await TokenRepository.store({
    userId,
    tokenHash,
    isRevoked: false,
    expiresAt: new Date(
      Date.now() + 1000 * 60 * 60 * 24 * 30
    )
  })

  return {
    accessToken,
    refreshToken
  }
}

}
