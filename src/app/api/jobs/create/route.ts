import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/auth/with-auth";
import { requireRole } from "@/lib/auth/role.guard";

export const POST = withAuth(async (req: NextRequest, user) => {

  requireRole(user, ["employer", "admin"]);

  const body = await req.json();

  // create job logic here

  return NextResponse.json({
    success: true
  });

});
