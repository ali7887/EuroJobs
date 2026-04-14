import { NextRequest, NextResponse } from "next/server";
import { jobService } from "@/lib/services/job.service";
import { verifyAccessToken } from "@/lib/jwt/jwt.utils";

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });

    const user = await verifyAccessToken(token);
    if (user.role !== "employer" && user.role !== "admin") {
      return NextResponse.json({ error: "EMPLOYER_ONLY" }, { status: 403 });
    }

    const body = await req.json();

    const job = await jobService.createJob(user.userId, body);

    return NextResponse.json({ job }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
