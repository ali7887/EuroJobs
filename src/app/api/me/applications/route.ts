import { applicationService } from "@/lib/services/application.service";
import { auth } from "@/lib/auth/auth";
import { NextResponse } from "next/server";

export async function GET() {

  const session = await auth();

  if (!session?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  };
  const userId = session?.userId;

  if (!userId)
    return new Response("Unauthorized", { status: 401 });

  const apps = await applicationService.getUserApplications(userId);

  return Response.json({
    applications: apps,
  });
}
