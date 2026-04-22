import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { jobs } from "@/lib/db/schema/jobs";
import { applications } from "@/lib/db/schema/applications";
import { eq, and } from "drizzle-orm";
import { requireAuth } from "@/lib/auth/auth.guard";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  try {
    const user = await requireAuth(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { jobId } = await params;
    const jobIdNum = parseInt(jobId, 10);

    if (isNaN(jobIdNum)) {
      return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
    }

    // بررسی وجود شغل
    const job = await db.query.jobs.findFirst({
      where: eq(jobs.id, jobIdNum),
    });

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    if (!job.isActive) {
      return NextResponse.json(
        { error: "Job is not active" },
        { status: 400 }
      );
    }

    // بررسی درخواست تکراری
    const existingApplication = await db.query.applications.findFirst({
      where: and(
        eq(applications.jobId, jobIdNum),
        eq(applications.userId, user.userId)
      ),
    });

    if (existingApplication) {
      return NextResponse.json(
        { error: "You have already applied to this job" },
        { status: 400 }
      );
    }

    const body = await req.json();

    // ثبت درخواست
    const [application] = await db
      .insert(applications)
      .values({
        jobId: jobIdNum,
        userId: user.userId,
        resumePath: body.resumePath || body.resumeUrl, // پشتیبانی از هر دو نام
        coverLetter: body.coverLetter,
      })
      .returning();

    return NextResponse.json(application, { status: 201 });
  } catch (error: any) {
    if (error?.status === 401) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    console.error("Error applying to job:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
