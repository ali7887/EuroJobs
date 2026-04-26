// src/app/api/admin/jobs/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db/db";
import { jobs, type NewJob, jobStatusEnum } from "@/lib/db/schema/jobs";

// GET /api/admin/jobs  → لیست همه‌ی شغل‌ها
export async function GET() {
  const allJobs = await db.select().from(jobs);
  return NextResponse.json(allJobs);
}

// POST /api/admin/jobs  → ایجاد شغل جدید
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();

  const payload: NewJob = {
    title: data.title,
    description: data.description ?? null,
    location: data.location ?? null,
    salary: data.salary ?? null,
    isRemote: data.isRemote ?? false,
    type: data.type ?? null,
    level: data.level ?? null, 
    companyId: data.companyId ?? null,
    employerId: data.employerId ?? null,
    isActive: data.isActive ?? true,
    published: data.published ?? false,
    status:
      (data.status as (typeof jobStatusEnum.enumValues)[number]) ?? "open",
    // createdAt / updatedAt خود Drizzle پر می‌کند
  };

  const inserted = await db.insert(jobs).values(payload).returning();

  // inserted یک آرایه است (به خاطر returning())
  return NextResponse.json(inserted[0]);
}
