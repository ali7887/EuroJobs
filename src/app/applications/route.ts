import { NextResponse } from "next/server";
import { applicationService } from "@/lib/services/application.service";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (id) {
      const application = await applicationService.getApplicationById(id);
      if (!application)
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json(application);
    }
    const all = await applicationService.getApplications();
    return NextResponse.json(all);
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const application = await applicationService.createApplication(body);
    return NextResponse.json(application, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
