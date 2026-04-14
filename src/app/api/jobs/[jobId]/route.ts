import { NextRequest, NextResponse } from "next/server";
import { jobService } from "@/lib/services/job.service";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const { jobId } = await params;

  const job = await jobService.getJob(Number(jobId));
  if (!job) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(job);
}
