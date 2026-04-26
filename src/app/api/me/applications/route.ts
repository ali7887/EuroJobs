import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { applicationService } from "@/lib/services/application.service";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId)
    return new Response("Unauthorized", { status: 401 });

  const apps = await applicationService.getUserApplications(userId);

  return Response.json({
    applications: apps,
  });
}
