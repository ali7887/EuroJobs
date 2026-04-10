import { NextResponse } from "next/server";
import { jobService } from "@/lib/services/job.service";

export async function GET() {
  const jobs = await jobService.listJobs();
  return NextResponse.json(jobs);
}

export async function POST(req: Request) {
  const body = await req.json();

  const job = await jobService.createJob(
    {
      title: body.title,
      description: body.description,
      type: body.type ?? null,
      location: body.location ?? null,
      companyId: Number(body.companyId),
    },
    body.employerId,
    body.companyName
  );

  return NextResponse.json(job);
}
