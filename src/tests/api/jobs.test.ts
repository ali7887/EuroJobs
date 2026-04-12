import { describe, it, expect } from "vitest"

describe("Jobs API", () => {

  it("should return jobs list", async () => {

    const res = await fetch("http://localhost:3000/api/jobs")

    expect(res.status).toBe(200)
  })

})
