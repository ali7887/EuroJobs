// src/app/api/jobs/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { jobs } from "@/lib/db/schema";
import { eq, and, desc, SQL } from "drizzle-orm";
import { requireAuth } from "@/lib/auth/auth.guard";

export async function GET(req: NextRequest) {
  try {
    const user = await requireAuth(req);
    const { searchParams } = new URL(req.url);
    const isActive = searchParams.get("isActive");
    const published = searchParams.get("published");

    const conditions: SQL[] = [];

    if (user.role === "employer") {
      conditions.push(eq(jobs.employerId, user.userId));
    }

    if (isActive !== null) {
      conditions.push(eq(jobs.isActive, isActive === "true"));
    }

    if (published !== null) {
      conditions.push(eq(jobs.published, published === "true"));
    }

    const result = await db
      .select()
      .from(jobs)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(jobs.createdAt));

    return NextResponse.json(result);
  } catch (error: any) {
    if (error?.status === 401) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("GET /api/jobs error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth(req);

    if (user.role !== "employer") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();

    const [job] = await db
      .insert(jobs)
      .values({
        ...body,
        employerId: user.userId,
      })
      .returning();

    return NextResponse.json(job, { status: 201 });
  } catch (error: any) {
    if (error?.status === 401) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("POST /api/jobs error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
