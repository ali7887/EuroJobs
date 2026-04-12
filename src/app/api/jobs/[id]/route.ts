import { NextResponse } from "next/server";
import { jobRepository } from "@/lib/repositories/job.repository";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const job = await jobRepository.findById(Number(id));

    if (!job)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json(job);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed" },
      { status: 500 }
    );
  }
}
