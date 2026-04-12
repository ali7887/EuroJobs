import { NextResponse } from "next/server";
import { applicationService } from "@/lib/services/application.service";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const list =
      await applicationService.getJobApplications(Number(id));

    return NextResponse.json(list);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
