import { NextRequest, NextResponse } from "next/server";
import { getApplicationsByJobId } from "@/lib/db/XXXXdb-operations";

export async function GET(
  request: NextRequest,
  { params }: { params: { jobId: string } }
) {
  try {
    const applications = await getApplicationsByJobId(params.jobId);
    return NextResponse.json(applications);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}
