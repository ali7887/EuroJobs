import { NextRequest } from "next/server";

export function extractAccessToken(req: NextRequest): string | null {
  const cookieToken = req.cookies.get("accessToken")?.value;
  if (cookieToken) return cookieToken;

  const authHeader = req.headers.get("authorization");
  if (!authHeader) return null;

  const [scheme, token] = authHeader.split(" ");
  if (scheme !== "Bearer" || !token) return null;

  return token;
}
