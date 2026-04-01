import { NextRequest, NextResponse } from "next/server";
import { applicationService } from "@/lib/services/application.service";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const applications = await applicationService.getApplicationsByUser(userId);
    return NextResponse.json(applications);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
  }
}
