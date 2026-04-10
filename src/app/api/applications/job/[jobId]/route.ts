import { NextRequest, NextResponse } from "next/server";
import { ApplicationService } from "@/lib/services/application.service";

type Params = {
  params: Promise<{ jobId: string }>;
};

export async function GET(
  _req: NextRequest,
  { params }: Params
) {
  const { jobId } = await params;
  const jobIdNum = Number(jobId);

  const applications =
    await ApplicationService.getApplicationsByJob(jobIdNum);

  return NextResponse.json(applications);
}
