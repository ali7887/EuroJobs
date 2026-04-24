import { requireAuth } from "@/lib/auth/auth.guard";
import { db } from "@/lib/db";
import { refreshTokens } from "@/lib/db/schema/refresh_tokens";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  const ctx = await requireAuth(request);

  await db
    .update(refreshTokens)
    .set({ revoked: true })
    .where(eq(refreshTokens.userId, ctx.userId));

  return Response.json({ success: true });
}
