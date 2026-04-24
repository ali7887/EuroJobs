import { NextRequest } from "next/server";
import { verifyAccessToken } from "@/lib/jwt/jwt.utils";
import type { AuthContext } from "./auth.context";
export const runtime = "nodejs";

export async function getUserFromRequest(req: NextRequest): Promise<AuthContext> {
  const token = req.cookies.get("access_token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const payload = await verifyAccessToken(token);

  return {
    userId: payload.userId,
    email: payload.email,
    role: payload.role,
  };
}
