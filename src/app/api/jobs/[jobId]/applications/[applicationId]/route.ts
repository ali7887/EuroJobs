// src/app/api/jobs/[jobId]/applications/[applicationId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { applications, jobs } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { requireAuth } from "@/lib/auth/auth.guard";

type RouteContext = {
  params: Promise<{ jobId: string; applicationId: string }>;
};

export async function GET(
  req: NextRequest,
  { params }: RouteContext
) {
  try {
    const user = await requireAuth(req);
    const { jobId, applicationId } = await params;

    if (!jobId || isNaN(Number(jobId)) || !applicationId || isNaN(Number(applicationId))) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const [application] = await db
      .select()
      .from(applications)
      .where(
        and(
          eq(applications.id, Number(applicationId)),
          eq(applications.jobId, Number(jobId))
        )
      )
      .limit(1);

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    if (user.role === "employer") {
      const [job] = await db
        .select()
        .from(jobs)
        .where(eq(jobs.id, Number(jobId)))
        .limit(1);

      if (!job || job.employerId !== user.userId) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    } else if (application.userId !== user.userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(application);
  } catch (error: any) {
    if (error?.status === 401) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("GET /api/jobs/[jobId]/applications/[applicationId] error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: RouteContext
) {
  try {
    const user = await requireAuth(req);
    const { jobId, applicationId } = await params;

    if (!jobId || isNaN(Number(jobId)) || !applicationId || isNaN(Number(applicationId))) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const [application] = await db
      .select()
      .from(applications)
      .where(
        and(
          eq(applications.id, Number(applicationId)),
          eq(applications.jobId, Number(jobId))
        )
      )
      .limit(1);

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    if (user.role === "employer") {
      const [job] = await db
        .select()
        .from(jobs)
        .where(eq(jobs.id, Number(jobId)))
        .limit(1);

      if (!job || job.employerId !== user.userId) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    } else if (application.userId !== user.userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();

    const [updated] = await db
      .update(applications)
      .set(body)
      .where(eq(applications.id, Number(applicationId)))
      .returning();

    return NextResponse.json(updated);
  } catch (error: any) {
    if (error?.status === 401) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("PATCH /api/jobs/[jobId]/applications/[applicationId] error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
