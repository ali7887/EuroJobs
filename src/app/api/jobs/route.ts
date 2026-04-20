import { NextRequest, NextResponse } from "next/server";
import { jobService } from "@/lib/services/job.service";
import { getCurrentUser } from "@/lib/auth/get-current-user";

export async function GET() {
  const jobs = await jobService.getJobs(); // ✅ حالا این تابع اضافه شده
  return NextResponse.json(jobs);
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser(req);
  const body = await req.json();

  const job = await jobService.createJob(String(user.id), body); // ✅ آرگومان دوم داده شد
  return NextResponse.json(job);
}
