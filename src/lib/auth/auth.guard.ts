import { getTokenFromRequest } from "./token.extractor";
import { verifyAccessToken } from "@/lib/jwt/jwt.utils";
import type { AuthContext } from "./auth.context";

export const runtime = "nodejs";

export async function requireAuth(req: Request): Promise<AuthContext> {
  const token = getTokenFromRequest(req);
  if (!token) {
    throw Object.assign(new Error("Unauthorized"), { status: 401 });
  }

  const payload = await verifyAccessToken(token);

  if (typeof payload.userId !== "string") {
    throw Object.assign(new Error("Invalid user identifier format"), { status: 400 });
  }

  return {
    userId: payload.userId,
    email: payload.email,
    role: payload.role,
  };
}
