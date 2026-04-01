import { NextResponse } from "next/server";
import { applicationService } from "@/lib/services/application.service";

export async function GET() {
  try {
    const all = await applicationService.getApplications();
    return NextResponse.json(all);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
  }
}
