import { NextRequest } from "next/server";
import { verifyAccessToken } from "@/lib/jwt/jwt.utils";
import { getTokenFromRequest } from "@/lib/auth/token.extractor";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export interface AuthUser {
  id: string;
  email: string;
  role: string;
}

export async function authenticate(request: NextRequest): Promise<AuthUser> {
  const token = getTokenFromRequest(request);

  if (!token) {
    throw new Error("Unauthorized");
  }

  const payload = await verifyAccessToken(token);

  if (!payload?.userId) {
    throw new Error("Invalid token");
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, payload.userId))
    .limit(1);

  if (!user) {
    throw new Error("User not found");
  }

 return {
  id: String(user.id),
  email: user.email,
  role: user.role ?? "user",
};
;
}
