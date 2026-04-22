// src/app/api/jobs/[jobId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { jobs } from "@/lib/db/schema";
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
    const { jobId } = await params;

    if (!jobId || isNaN(Number(jobId))) {
      return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
    }

    const [job] = await db
      .select()
      .from(jobs)
      .where(eq(jobs.id, Number(jobId)))
      .limit(1);

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(job);
  } catch (error) {
    console.error("GET /api/jobs/[jobId] error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: RouteContext
) {
  try {
    const user = await requireAuth(req);
    const { jobId } = await params;

    if (!jobId || isNaN(Number(jobId))) {
      return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
    }

    const [existingJob] = await db
      .select()
      .from(jobs)
      .where(eq(jobs.id, Number(jobId)))
      .limit(1);

    if (!existingJob) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    if (user.role === "employer" && existingJob.employerId !== user.userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();

    const [updatedJob] = await db
      .update(jobs)
      .set(body)
      .where(eq(jobs.id, Number(jobId)))
      .returning();

    return NextResponse.json(updatedJob);
  } catch (error: any) {
    if (error?.status === 401) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("PATCH /api/jobs/[jobId] error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: RouteContext
) {
  try {
    const user = await requireAuth(req);
    const { jobId } = await params;

    if (!jobId || isNaN(Number(jobId))) {
      return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
    }

    const [existingJob] = await db
      .select()
      .from(jobs)
      .where(eq(jobs.id, Number(jobId)))
      .limit(1);

    if (!existingJob) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    if (user.role === "employer" && existingJob.employerId !== user.userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await db.delete(jobs).where(eq(jobs.id, Number(jobId)));

    return NextResponse.json({ message: "Job deleted successfully" });
  } catch (error: any) {
    if (error?.status === 401) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("DELETE /api/jobs/[jobId] error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
