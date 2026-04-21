import { NextRequest, NextResponse } from "next/server";
import { applicationService } from "@/lib/services/application.service";
import { jobService } from "@/lib/services/job.service";
import { auth } from "@/lib/auth/auth";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const user = await auth();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await context.params;
  const appId = Number(id);

  // تغییر متد به getApplicationById برای هماهنگی با سرویس
  const current = await applicationService.getApplicationById(appId);

  if (!current) {
    return NextResponse.json({ error: "Application not found" }, { status: 404 });
  }

  // چک کردن دسترسی (فقط صاحب اپلیکیشن یا کارفرما - فعلاً ساده)
  if (current.userId !== user.userId && user.role !== "employer") 
 {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (!current.jobId) {
    return NextResponse.json({ error: "Invalid jobId" }, { status: 400 });
  }

  const job = await jobService.getJob(current.jobId);

  return NextResponse.json({ application: current, job });
}
