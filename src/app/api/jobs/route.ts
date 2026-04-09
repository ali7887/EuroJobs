import { requireAuth } from "@/lib/auth/auth.guard";

export async function POST(req: Request) {

  const user = await requireAuth();

  return Response.json({
    message: "authorized",
    user
  });

}
