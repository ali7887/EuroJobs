// src/app/api/gapgpt-test/route.ts
export const runtime = "nodejs";
import { NextResponse } from "next/server";

const GAPGPT_API_URL = process.env.GAPGPT_API_URL ?? "https://api.gapgpt.ir/v1";
const GAPGPT_API_KEY = process.env.GAPGPT_API_KEY;
const GAPGPT_MODEL = process.env.GAPGPT_MODEL ?? "gpt-5.2";

export async function GET() {
  try {
    if (!GAPGPT_API_KEY) {
      return NextResponse.json(
        { ok: false, error: "Missing GAPGPT_API_KEY in environment" },
        { status: 500 }
      );
    }

    // تماس مستقیم با GapGPT برای تشخیص ریشه خطا
    const res = await fetch(`${GAPGPT_API_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GAPGPT_API_KEY}`,
      },
      body: JSON.stringify({
        model: GAPGPT_MODEL,
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: "Say a short hello in Persian." },
        ],
      }),
    });

    const text = await res.text().catch(() => "");

    if (!res.ok) {
      // خطای API را درست گزارش کن تا بفهمیم 401/400/… است
      return NextResponse.json(
        {
          ok: false,
          status: res.status,
          statusText: res.statusText,
          body: text,
          endpoint: `${GAPGPT_API_URL}/chat/completions`,
          model: GAPGPT_MODEL,
        },
        { status: 500 }
      );
    }

    // سعی کن JSON را parse کنی؛ اگر نشد متن خام را برگردان
    let data: any = null;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    return NextResponse.json({ ok: true, data }, { status: 200 });
  } catch (error: any) {
    // لاگ داخلی برای سرنخ بیشتر
    console.error("GapGPT test route error:", error);
    return NextResponse.json(
      {
        ok: false,
        error: error?.message ?? "Internal error",
        name: error?.name,
        stack: error?.stack,
      },
      { status: 500 }
    );
  }
}
