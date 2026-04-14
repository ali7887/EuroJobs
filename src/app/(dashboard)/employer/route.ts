import { jobService } from "@/lib/services/job.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const rawId = req.headers.get("x-user-id");
  const userId = rawId ? String(rawId) : "";

  const jobs = await jobService.getEmployerJobs(userId);

  return NextResponse.json(jobs);
}
