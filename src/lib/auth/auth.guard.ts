import { NextRequest } from "next/server";
import { getTokenFromRequest } from "./token.extractor";
import { verifyAccessToken } from "@/lib/jwt/jwt.utils";
import type { AuthContext } from "./auth.context";
export const runtime = "nodejs";

export async function requireAuth(req: NextRequest): Promise<AuthContext> {
  const token = getTokenFromRequest(req);
  if (!token) {
    throw Object.assign(new Error("Unauthorized"), { status: 401 });
  }

  const payload = await verifyAccessToken(token);

  return {
    userId: Number(payload.userId),
    email: payload.email,
    role: payload.role,
  };
}
