import {
  verifyRefreshToken,
  signAccessToken,
  signRefreshToken
} from "@/lib/jwt/jwt.utils";

import { db } from "@/lib/db";
import { refreshTokens } from "@/lib/db/schema/refresh_tokens";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {

  const { refreshToken } = await req.json();

  const payload = await verifyRefreshToken(refreshToken);

  const stored = await db.query.refreshTokens.findFirst({
    where: eq(refreshTokens.token, refreshToken)
  });

  if (!stored || stored.revoked) {
    return Response.json({ error: "Invalid token" }, { status: 401 });
  }

  await db
    .update(refreshTokens)
    .set({ revoked: true })
    .where(eq(refreshTokens.id, stored.id));

  const accessToken = await signAccessToken({
    userId: String(payload.userId),
    role: "user"
  });

  const newRefresh = await signRefreshToken({
    userId: payload.userId
  });

  await db.insert(refreshTokens).values({
    userId: payload.userId,
    token: newRefresh,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  });

  return Response.json({
    accessToken,
    refreshToken: newRefresh
  });
}
