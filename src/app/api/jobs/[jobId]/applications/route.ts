import { NextRequest, NextResponse } from "next/server";
import { jobApplicationsRepository } from "@/lib/repositories/job-applications.repository";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const { jobId } = await params;

  const applications = await jobApplicationsRepository.findById(
    Number(jobId)
  );

  return NextResponse.json(applications);
}
