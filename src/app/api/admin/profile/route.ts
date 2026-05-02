import { auth } from "@/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema/users";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function GET() {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, session.userId));

  return NextResponse.json({ user });
}
