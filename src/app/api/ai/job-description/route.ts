// app/api/ai/job-description/route.ts
import { NextResponse } from "next/server";
import { aiService } from "@/lib/services/ai.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, skills, seniority } = body;

    if (!title || !skills || !seniority) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const description = await aiService.generateJobDescription({
      title,
      skills,
      seniority,
    });

    return NextResponse.json({ description });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
