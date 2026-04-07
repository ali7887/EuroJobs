import { describe, it, expect, beforeEach } from "vitest"
import { authService } from "@/lib/auth/auth.service"
import { resetTestDB } from "@/lib/db/test-db"

describe("Auth Integration", () => {

  beforeEach(async () => {
    await resetTestDB()
  })

  it("should register user and return tokens", async () => {

    const email = `test-${Date.now()}@example.com`

    const result = await authService.register({
      email,
      password: "123456",
      name: "Test User"
    })

    expect(result.user.email).toBe(email)

    // new correct structure
    expect(result.tokens.accessToken).toBeDefined()
    expect(result.tokens.refreshToken).toBeDefined()
  })


  it("should login existing user and return tokens", async () => {

    const email = `login-${Date.now()}@example.com`

    await authService.register({
      email,
      password: "123456",
      name: "Login User"
    })

    const result = await authService.login({
      email,
      password: "123456",
    })

    expect(result.user.email).toBe(email)
    expect(result.tokens.accessToken).toBeDefined()
    expect(result.tokens.refreshToken).toBeDefined()
  })

})
