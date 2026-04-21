import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth/auth.guard";
import { db } from "@/lib/db";
import { refreshTokens } from "@/lib/db/schema/refresh_tokens";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {

  const ctx = await requireAuth(req);




  await db
    .update(refreshTokens)
    .set({ revoked: true })
    .where(eq(refreshTokens.userId, Number(ctx.userId)));

  return Response.json({ success: true });
}
