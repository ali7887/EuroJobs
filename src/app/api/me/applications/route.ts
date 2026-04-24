import { auth } from "@clerk/nextjs/server";
import { applicationService } from "@/lib/services/application.service";

export async function GET() {
  const { userId } = await auth();

  if (!userId)
    return new Response("Unauthorized", { status: 401 });

  const apps = await applicationService.getUserApplications(userId);

  return Response.json({
    applications: apps,
  });
}
