import { POST } from "@/app/api/applications/route";
import { NextRequest } from "next/server";

function mockNextRequest(url: string, options: any) {
  return new NextRequest(url, {
    method: options.method,
    body: options.body,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

describe("API /api/applications/apply", () => {
  it("should return 201 on successful apply", async () => {
    const req = mockNextRequest(
      "http://localhost/api/applications/apply",
      {
        method: "POST",
        body: JSON.stringify({ jobId: 10, userId: 20 }),
      }
    );

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(201);
    expect(json.id).toBeDefined();
  });
});
