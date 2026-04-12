import { NextRequest, NextResponse } from "next/server"
import { applicationService } from "@/lib/services/application.service"

export async function GET(
req: NextRequest,
{ params }: { params: Promise<{ userId: string }> }
){

const { userId } = await params

const applications =
await applicationService.getUserApplications(Number(userId))

return NextResponse.json(applications)

}
