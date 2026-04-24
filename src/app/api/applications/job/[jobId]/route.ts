import { NextRequest, NextResponse } from "next/server";
import { applicationService } from "@/lib/services/application.service";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  try {
    const { jobId } = await params;
    const data = await applicationService.getJobApplications(jobId);

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Error" },
      { status: 500 }
    );
  }
}
