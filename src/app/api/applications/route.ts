import { NextRequest, NextResponse } from "next/server";
import { applicationService } from "@/lib/services/application.service";
import { auth } from "@/lib/auth/auth";

export async function POST(req: NextRequest) {
  try {
    const user = await auth();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { jobId, resumePath, coverLetter } = body;

    if (!jobId) {
      return NextResponse.json({ error: "JobId is required" }, { status: 400 });
    }

    // هماهنگ با تعریف سرویس: userId (arg1), jobId (arg2), data (arg3)
    const result = await applicationService.applyToJob(
      user.userId, 
      Number(jobId), 
      { resumePath, coverLetter }
    );

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
