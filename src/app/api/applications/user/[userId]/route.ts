import { NextRequest, NextResponse } from "next/server";
import { getApplicationsByUserId } from "@/lib/db/XXXXdb-operations";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const applications = await getApplicationsByUserId(params.userId);
    return NextResponse.json(applications);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}
