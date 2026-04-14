import { NextRequest, NextResponse } from "next/server";
import { jobApplicationsRepository } from "@/lib/repositories/job-applications.repository";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ jobId: string; applicationId: string }> }
) {
  const { applicationId } = await params;

  const application = await jobApplicationsRepository.findById(
    Number(applicationId)
  );

  if (!application) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(application);
}
