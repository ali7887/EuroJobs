import { NextResponse } from "next/server";
import { authService } from "@/lib/services/auth.service";

export async function POST(req: Request) {
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
