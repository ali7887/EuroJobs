import { NextResponse } from "next/server";
import { applicationService } from "@/lib/services/application.service"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const application =
        await applicationService.getJobApplications(Number(id));

      if (!application)
        return NextResponse.json({ error: "Not found" }, { status: 404 });

      return NextResponse.json(application);
    }


  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
