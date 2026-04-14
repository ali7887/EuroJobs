import { NextResponse } from "next/server";
import { authService } from "@/lib/auth/auth.service";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    const result = await authService.register({ email, password, name });
    return NextResponse.json(result, { status: 201 });

  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Registration failed" },
      { status: 400 }
    );
  }
}
