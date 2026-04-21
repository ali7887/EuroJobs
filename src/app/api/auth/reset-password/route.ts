import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/lib/services/auth.service";
import { authRateLimit } from "@/lib/security/rate-profiles";

export async function POST(req: NextRequest) {
  // ✅ Rate Limit FIRST
  authRateLimit(req);

  try {
    const { token, password } = await req.json();

    await authService.resetPassword(token, password);

    return NextResponse.json({ message: "Password updated" });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Error" },
      { status: 400 }
    );
  }
}
