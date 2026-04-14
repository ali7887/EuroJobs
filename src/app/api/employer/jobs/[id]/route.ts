import { NextRequest, NextResponse } from "next/server";
import { jobService } from "@/lib/services/job.service";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const job = await jobService.getJob(Number(id));

  if (!job) {
    return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  }

  return NextResponse.json(job);
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const userId = req.headers.get("x-user-id");
  if (!userId) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });

  const body = await req.json();

  const updated = await jobService.updateJob(Number(id), Number(userId), body);

  return NextResponse.json(updated);
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const userId = req.headers.get("x-user-id");
  if (!userId) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });

  await jobService.deleteJob(Number(id), Number(userId));

  return NextResponse.json({ success: true });
}
