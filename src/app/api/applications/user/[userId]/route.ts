import { NextRequest, NextResponse } from "next/server";
import { applicationService } from "@/lib/services/application.service";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const data = await applicationService.getUserApplications(userId);
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
