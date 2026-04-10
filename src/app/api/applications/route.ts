import { NextResponse } from "next/server";
import { ApplicationService } from "@/lib/services/application.service";

export async function GET() {
  try {
    const all = await ApplicationService.getAllApplications();

    return NextResponse.json(all);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}
