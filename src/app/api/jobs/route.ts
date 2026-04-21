import { NextRequest, NextResponse } from "next/server";
import { ensureRole } from "@/lib/auth/role.guard";

export async function POST(req: NextRequest) {
  try {
    const user = await ensureRole(req, ["recruiter", "admin"]);

    return NextResponse.json({
      message: "Job created",
      userId: user.userId,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }
}
