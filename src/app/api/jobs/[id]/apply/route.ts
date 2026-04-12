import { NextResponse } from "next/server";
import { applicationService } from "@/lib/services/application.service";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    // NOTE: userId باید از auth/session خوانده شود
    const userId = body.userId || 1;

    const application = await applicationService.applyToJob(
      userId,
      Number(id),
      body
    );

    return NextResponse.json(application);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
