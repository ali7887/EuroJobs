import { NextResponse } from "next/server";
import { ApplicationService } from "@/lib/services/application.service";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const application =
        await ApplicationService.getApplicationsByJob(Number(id));

      if (!application)
        return NextResponse.json({ error: "Not found" }, { status: 404 });

      return NextResponse.json(application);
    }

    const all = await ApplicationService.getAllApplications();
    return NextResponse.json(all);
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
