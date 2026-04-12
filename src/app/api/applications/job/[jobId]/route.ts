//D:\project\NEW\job-board-saas\src\app\api\applications\job\[jobId]\route.ts
import { NextRequest, NextResponse } from "next/server"
import { applicationService } from "@/lib/services/application.service"

export async function GET(
req: NextRequest,
{ params }: { params: Promise<{ jobId: string }> }
) {

const { jobId } = await params

const applications =
await applicationService.getJobApplications(Number(jobId))

return NextResponse.json(applications)

}
