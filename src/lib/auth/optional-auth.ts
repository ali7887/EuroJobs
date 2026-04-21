import { NextRequest } from "next/server";
import { extractAccessToken } from "./token.extractor";
import { verifyAccessToken } from "@/lib/jwt/jwt.utils";
import type { AuthContext } from "./auth.context";
import type { UserRole } from "../types/auth.types";

export async function optionalAuth(req: NextRequest): Promise<AuthContext | null> {
  const token = extractAccessToken(req);
  if (!token) return null;

  try {
    const payload = await verifyAccessToken(token);

    return {
      userId: Number(payload.userId),
      role: payload.role as UserRole,
    };
  } catch {
    return null;
  }
}
