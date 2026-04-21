import { NextRequest } from "next/server";
import { requireAuth } from "./auth.guard";

export async function getCurrentUser(req: NextRequest) {
  return await requireAuth(req);
}
