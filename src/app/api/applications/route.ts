import { NextResponse } from "next/server";
import { applicationService } from "@/lib/services/application.service";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const applications =
      await applicationService.getJobApplications(id);

    if (!applications) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(applications);
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { jobId, userId } = body;

    if (!jobId || !userId) {
      return NextResponse.json(
        { error: "jobId and userId required" },
        { status: 400 }
      );
    }

    const application = await applicationService.applyToJob(
      userId,
      jobId,
      {}
    );

    return NextResponse.json(application, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Apply failed" }, { status: 500 });
  }
}
