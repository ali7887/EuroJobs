import { NextResponse } from "next/server";
import { applicationService } from "@/lib/services/application.service";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const application =
      await applicationService.getApplicationById(Number(id));

    if (!application)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json(application);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
