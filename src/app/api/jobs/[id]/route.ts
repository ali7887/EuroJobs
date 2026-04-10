import { NextRequest, NextResponse } from "next/server";
import { jobService } from "@/lib/services/job.service";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const job = await jobService.getJob(Number(id));

  if (!job)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(job);
}
