import { NextResponse } from "next/server"
import { applicationService } from "@/lib/services/application.service"

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
){
  const { id } = await params
  const jobId = Number(id)

  try {

    const body = await req.json()

    const application = await applicationService.applyToJob(
      body.userId,
      jobId,
      {
        resumeUrl: body.resumeUrl,
        coverLetter: body.coverLetter
      }
    )

    return NextResponse.json(application)

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { error: "failed to apply" },
      { status: 500 }
    )

  }
}
