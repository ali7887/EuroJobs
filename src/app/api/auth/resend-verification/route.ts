import { NextRequest, NextResponse } from "next/server";
import { authRateLimit } from "@/lib/security/rate-profiles";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema/users";
import { eq } from "drizzle-orm";
import { signEmailVerificationToken } from "@/lib/jwt/jwt.utils";
import { sendVerificationEmail } from "@/lib/mail/send-verification";
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  authRateLimit(req);

  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    // For privacy: always return the same message
    if (!user) {
      return NextResponse.json({
        message: "If an account exists, a verification email was sent",
      });
    }

    // If user is already verified, no need to send anything
    if (user.emailVerified) {
      return NextResponse.json({
        message: "Account is already verified",
      });
    }

    // Generate verification token
    const token = await signEmailVerificationToken({
      userId: user.id,
      email: user.email,
    });

    // Send email
    await sendVerificationEmail({
      to: user.email,
      token,
    });

    return NextResponse.json({
      message: "If an account exists, a verification email was sent",
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
