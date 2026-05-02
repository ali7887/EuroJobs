import { auth } from "@/auth";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema/users";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { oldPassword, newPassword } = await req.json();

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, session.userId));

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const match = await bcrypt.compare(oldPassword, user.passwordHash);
  if (!match)
    return NextResponse.json({ error: "Incorrect password" }, { status: 403 });

  const newHash = await bcrypt.hash(newPassword, 10);

  await db
    .update(users)
    .set({ passwordHash: newHash })
    .where(eq(users.id, session.userId));

  return NextResponse.json({ success: true });
}
