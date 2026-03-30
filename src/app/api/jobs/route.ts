import { NextRequest, NextResponse } from "next/server";
import { getJobs, createJob } from "@/lib/db/XXXXdb-operations";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("status") || undefined;
    const type = searchParams.get("type") || undefined;

    const jobs = await getJobs({ status, type });
    return NextResponse.json(jobs);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const job = await createJob(body);
    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 }
    );
  }
}
