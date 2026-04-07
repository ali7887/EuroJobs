import { describe, it, expect } from "vitest"
import { authService } from "@/lib/auth/auth.service"

describe("authService.register", () => {

  it("should register user", async () => {

    const email = `test-${Date.now()}@example.com`

    const result = await authService.register({
      email,
      password: "123456",
      name: "Test User"
    })

    expect(result.user.email).toBe(email)

  })

})
