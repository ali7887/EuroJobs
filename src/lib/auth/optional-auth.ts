import { getTokenFromRequest } from "./token.extractor";
import { verifyAccessToken } from "../jwt/jwt.utils";
import type { AuthContext } from "./auth.context";
export const runtime = "nodejs";

export async function optionalAuth(req: Request): Promise<AuthContext | null> {
  const token = getTokenFromRequest(req as any);
  if (!token) return null;

  try {
    const payload = await verifyAccessToken(token);

    return {
      userId: Number(payload.userId),
      email: payload.email,
      role: payload.role,
    };
  } catch {
    return null;
  }
}
