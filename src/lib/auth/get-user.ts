import { NextRequest } from "next/server";
import { verifyAccessToken } from "@/lib/jwt/jwt.utils";
export const runtime = "nodejs";

export async function getUserFromRequest(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const payload = await verifyAccessToken(token);

  return payload;
}
