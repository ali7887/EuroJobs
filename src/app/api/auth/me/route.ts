import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/auth.guard";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema/users";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const ctx = await requireAuth(req);

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, ctx.userId));

    return NextResponse.json({ data: user });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
