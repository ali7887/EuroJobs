import { NextRequest, NextResponse } from "next/server"
import { jobService } from "@/lib/services/job.service"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {

  const { id } = await params

  const job = await jobService.getJob(Number(id))

  return NextResponse.json(job)
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {

  const { id } = await params

  await jobService.deleteJob(Number(id))

  return NextResponse.json({
    success: true
  })
}
