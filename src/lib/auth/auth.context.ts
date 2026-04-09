import { verifyAccessToken } from "@/lib/jwt/jwt.utils";
import type { AccessTokenPayload } from "@/lib/jwt/jwt.types";

export type AuthContext = {
  userId: string;
  role: string;
};

export async function getAuthContext(token: string): Promise<AuthContext> {

  const payload = await verifyAccessToken(token) as AccessTokenPayload;

  return {
    userId: payload.userId,
    role: payload.role
  };
}
