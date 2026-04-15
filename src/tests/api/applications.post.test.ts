import request from "supertest";
import { beforeAll, describe, it, expect } from "vitest";
import { getTestServer } from "../test-server";
import type { Server } from "http";

let server: Server;

beforeAll(async () => {
  server = await getTestServer();
});

describe("POST /api/applications", () => {
  it("should return 401 when no auth", async () => {
    const res = await request(server)
      .post("/api/applications")
      .send({ jobId: 1 });

    expect(res.status).toBe(401);
  });
});
