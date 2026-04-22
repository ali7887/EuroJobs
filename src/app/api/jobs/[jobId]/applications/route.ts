// src/app/api/jobs/[jobId]/applications/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { applications, jobs } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { requireAuth } from "@/lib/auth/auth.guard";

type RouteContext = {
  params: Promise<{ jobId: string }>;
};

export async function GET(
  req: NextRequest,
  { params }: RouteContext
) {
  try {
    const user = await requireAuth(req);
    const { jobId } = await params;

    if (!jobId || isNaN(Number(jobId))) {
      return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
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
    }

    const result = await db
      .select()
      .from(applications)
      .where(eq(applications.jobId, Number(jobId)));

    return NextResponse.json(result);
  } catch (error: any) {
    if (error?.status === 401) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("GET /api/jobs/[jobId]/applications error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: RouteContext
) {
  try {
    const user = await requireAuth(req);
    const { jobId } = await params;

    if (!jobId || isNaN(Number(jobId))) {
      return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
    }

    const body = await req.json();

    const [application] = await db
      .insert(applications)
      .values({
        ...body,
        jobId: Number(jobId),
        userId: user.userId,
      })
      .returning();

    return NextResponse.json(application, { status: 201 });
  } catch (error: any) {
    if (error?.status === 401) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("POST /api/jobs/[jobId]/applications error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
