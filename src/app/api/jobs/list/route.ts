import { NextRequest, NextResponse } from "next/server";
import { jobService } from "@/lib/services/job.service";
import { verifyAccessToken } from "@/lib/jwt/jwt.utils";

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });

    const user = await verifyAccessToken(token);

    const jobs = await jobService.getEmployerJobs(user.userId);

    return NextResponse.json({ jobs });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
