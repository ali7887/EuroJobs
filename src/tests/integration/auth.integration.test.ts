import { describe, it, expect, beforeEach } from "vitest"
import { authService } from "@/lib/services/auth.service";

import { resetTestDB } from "@/lib/db/test-db"

describe("Auth Integration", () => {

  beforeEach(async () => {
    await resetTestDB()
  })

  it("should register user and return tokens", async () => {

    const email = `test-${Date.now()}@example.com`

    const result = await authService.register({
      email,
      password: "Password123",
      name: "Test User"
    })

    expect(result.user.email).toBe(email)

    // FIXED: correct token access
    expect(result.accessToken).toBeDefined()
    expect(result.refreshToken).toBeDefined()
  })

  it("should login existing user and return tokens", async () => {

    const email = `login-${Date.now()}@example.com`

    await authService.register({
      email,
      password: "Password123",
      name: "Login User"
    })

    const result = await authService.login({
      email,
      password: "Password123",
    })

    expect(result.user.email).toBe(email)

    // FIXED
    expect(result.accessToken).toBeDefined()
    expect(result.refreshToken).toBeDefined()
  })

})
