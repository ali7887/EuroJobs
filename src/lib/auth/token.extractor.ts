import { NextRequest } from "next/server";

export function getTokenFromRequest(req: Request): string | null {
  const auth = req.headers.get("authorization");
  if (!auth) return null;

  const [, token] = auth.split(" ");
  return token ?? null;
}

