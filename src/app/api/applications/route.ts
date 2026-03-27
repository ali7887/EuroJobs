import { NextRequest, NextResponse } from "next/server";
import { createApplication } from "@/lib/db-operations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const application = await createApplication(body);
    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create application" },
      { status: 500 }
    );
  }
}
