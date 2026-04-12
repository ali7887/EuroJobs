import { NextRequest, NextResponse } from "next/server"
import { jobService } from "@/lib/services/job.service"

export async function GET(req:NextRequest){

const userId = Number(req.headers.get("x-user-id"))

const jobs =
await jobService.getEmployerJobs(userId)

return NextResponse.json(jobs)

}
