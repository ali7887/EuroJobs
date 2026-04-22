import { NextRequest } from "next/server";
import { verifyAccessToken } from "@/lib/jwt/jwt.utils";
export const runtime = "nodejs";

export async function getCurrentUser(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;

  if (!token) {
    throw new Error("Unauthorized: missing access token");
  }

  const payload = await verifyAccessToken(token);

  return {
    userId: payload.userId,
    email: payload.email,
    role: payload.role,
  };
}

export type CurrentUser = Awaited<ReturnType<typeof getCurrentUser>>;
