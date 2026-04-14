import { NextResponse } from "next/server";
import { authService } from "@/lib/services/auth.service";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    await authService.sendResetPasswordEmail(email);

    return NextResponse.json({ message: "Reset link sent" });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Error" },
      { status: 400 }
    );
  }
}
