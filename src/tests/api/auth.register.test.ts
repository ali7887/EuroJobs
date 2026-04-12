import { describe, it, expect, beforeEach } from "vitest"
import { POST } from "@/app/api/auth/register/route"
import { createPostRequest } from "../helpers/api-test-client"
import { resetTestDB } from "@/lib/db/test-db"

describe("POST /api/auth/register", () => {

  beforeEach(async () => {
    await resetTestDB()
  })

  it("should register a new user", async () => {

    const email = `api-${Date.now()}@test.com`

    const request = createPostRequest("/api/auth/register", {
      email,
      password: "Password123",
      name: "API User"
    })

    const response = await POST(request)

    expect(response.status).toBe(201)

    const body = await response.json()

    expect(body.user.email).toBe(email)
    expect(body.tokens.accessToken).toBeDefined()

  })

})
