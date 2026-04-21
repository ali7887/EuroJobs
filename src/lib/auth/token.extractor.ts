import { NextRequest } from "next/server";

export function getTokenFromRequest(req: NextRequest): string | null {
  const cookie = req.cookies.get("access_token")?.value;
  if (cookie) return cookie;

  const auth = req.headers.get("authorization");
  if (auth?.startsWith("Bearer ")) return auth.slice(7);

  return null;
}
