import { NextResponse } from "next/server";
import { gapgptChat } from "@/lib/ai/gapgpt";

export async function GET() {
  try {
    const output = await gapgptChat("Hello, can you respond?");

    return NextResponse.json({
      ok: true,
      response: output,
    });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }
}
