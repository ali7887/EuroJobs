import { NextRequest, NextResponse } from "next/server";
import { applicationService } from "@/lib/services/application.service";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ jobId: string }> }
) {
  const { jobId } = await context.params;

  const idNum = Number(jobId);
  if (isNaN(idNum)) {
    return NextResponse.json({ error: "Invalid jobId" }, { status: 400 });
  }

  const applications = await applicationService.getJobApplications(idNum);
  return NextResponse.json(applications);
}
