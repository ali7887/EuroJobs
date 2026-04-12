import { NextResponse } from "next/server";
import { jobRepository } from "@/lib/repositories/job.repository";
import { createJobSchema } from "../../../lib/validators/job.validator";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = createJobSchema.parse(body);

    const job = await jobRepository.create(data);
    return NextResponse.json(job, { status: 201 });

  } catch (err: any) {
    console.error("Cr Job Error:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 400 }
    );
  }
}
