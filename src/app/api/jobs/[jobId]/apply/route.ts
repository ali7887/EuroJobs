import { NextRequest, NextResponse } from "next/server";
import { jobApplicationsRepository } from "@/lib/repositories/job-applications.repository";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const { jobId } = await params;
  const data = await req.json();

  const created = await jobApplicationsRepository.create({
    ...data,
    jobId: Number(jobId),
  });

  return NextResponse.json(created);
}
