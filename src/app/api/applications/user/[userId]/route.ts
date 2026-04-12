import { NextResponse } from "next/server";
import { applicationService } from "@/lib/services/application.service";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;

    const applications =
      await applicationService.getUserApplications(Number(userId));

    return NextResponse.json(applications);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Error fetching applications" },
      { status: 500 }
    );
  }
}
