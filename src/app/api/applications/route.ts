import { NextRequest,NextResponse } from "next/server"
import { requireAuth } from "@/lib/middleware/auth.middleware"
import { applicationService } from "@/lib/services/application.service"

export async function GET(req:NextRequest){

const user = await requireAuth(req)

if(!user){
return NextResponse.json(
{error:"Unauthorized"},
{status:401}
)
}

const apps =
await applicationService.getUserApplications(user.id as number)

return NextResponse.json(apps)

}
