import { signAccessToken } from "@/lib/jwt/jwt.utils"
import { db } from "@/lib/db"
import { users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

class AuthService {

  async register({
    email,
    password,
    name
  }: {
    email: string
    password: string
    name: string
  }) {

    const user = await db
      .insert(users)
      .values({
        email,
        passwordHash: password,
        name
      })
      .returning()
      .then(r => r[0])

    const tokens = {
      accessToken: await signAccessToken({
        userId: String(user.id),
        role: user.role ?? "user"
      }),
      refreshToken: "temp-refresh-token"
    }

    return { user, tokens }
  }

  async login({
    email,
    password
  }: {
    email: string
    password: string
  }) {

    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .then(r => r[0])

    if (!user) {
      throw new Error("Invalid credentials")
    }

    if (user.passwordHash !== password) {
      throw new Error("Invalid credentials")
    }

    const tokens = {
      accessToken: await signAccessToken({
        userId: String(user.id),
        role: user.role ?? "user"
      }),
      refreshToken: "temp-refresh-token"
    }

    return { user, tokens }
  }

  async refresh(refreshToken: string) {

    const accessToken = await signAccessToken({
      userId: "1",
      role: "user"
    })

    return {
      accessToken,
      refreshToken
    }
  }

  async logout(_refreshToken: string) {
    return { success: true }
  }

  async logoutAll(_userId: number) {
    return { success: true }
  }
}

export const authService = new AuthService()
