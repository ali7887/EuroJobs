// src/app/applications/route.ts
import { NextResponse } from "next/server";
import { ApplicationService } from "@/lib/services/application.service";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const application = await ApplicationService.getApplicationsByJob(id);
      if (!application)
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json(application);
    }

    // ✅ اصلاح: استفاده از متد مناسب برای گرفتن همه رکوردها
    const all = await ApplicationService.getAllApplications();
    return NextResponse.json(all);
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
} // ✅ آکولاد بسته فراموش شده هم اضافه شد!

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const application = await ApplicationService.deleteApplication(body);
    return NextResponse.json(application, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
