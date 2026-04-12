import { NextRequest, NextResponse } from "next/server"
import { applicationService } from "@/lib/services/application.service"

export async function GET(
req: NextRequest,
{ params }: { params: Promise<{ id: string }> }
){

const { id } = await params

const applications =
await applicationService.getJobApplications(Number(id))

return NextResponse.json(applications)

}
