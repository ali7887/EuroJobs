import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth/auth.context";
import { requireRole } from "@/lib/auth/require-role";

export async function GET(req: NextRequest) {
  const user = getAuthUser(req);
  requireRole(user, ["recruiter", "admin"]);

  return NextResponse.json({
    message: "ok",
    userId: user.userId,
  });
}
