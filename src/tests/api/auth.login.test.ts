import { describe, it, expect, beforeEach } from "vitest"
import { POST } from "@/app/api/auth/login/route"
import { createPostRequest } from "../helpers/api-test-client"
import { resetTestDB } from "@/lib/db/test-db"
import { authService } from "@/lib/auth/auth.service"

describe("POST /api/auth/login", () => {

  beforeEach(async () => {
    await resetTestDB()
  })

  it("should login user", async () => {

    const email = `user-${Date.now()}@test.com`
    const password = "123456"

    await authService.register({
      email,
      password,
      name: "Test User"
    })

    const request = createPostRequest("/api/auth/login", {
      email,
      password
    })

    const response = await POST(request)

    expect(response.status).toBe(200)

    const body = await response.json()

    expect(body.tokens.accessToken).toBeDefined()
    expect(body.user.email).toBe(email)

  })

})
