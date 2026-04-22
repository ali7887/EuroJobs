import { NextRequest, NextResponse } from "next/server";
import { authRateLimit } from "@/lib/security/rate-profiles";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema/users";
import { eq } from "drizzle-orm";
import { signResetPasswordToken } from "@/lib/jwt/jwt.utils";
import { sendPasswordResetEmail } from "@/lib/mail/send-password-reset";
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  // Prevent brute-force
  authRateLimit(req);

  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    // For security: always return success message (even if no user found)
    if (!user) {
      return NextResponse.json({
        message: "If a matching account exists, an email was sent",
      });
    }

    // Create reset token (JWT)
    const token = await signResetPasswordToken({
      userId: user.id,
      email: user.email,
    });

    // Send reset email
    await sendPasswordResetEmail({
      to: user.email,
      token,
    });

    return NextResponse.json({
      message: "If a matching account exists, an email was sent",
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
