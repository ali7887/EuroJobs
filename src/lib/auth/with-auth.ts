import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/auth.guard";

export function withAuth(
  handler: (req: NextRequest, user: any) => Promise<NextResponse>
) {
  return async function (req: NextRequest): Promise<NextResponse> {
    try {
      const user = await requireAuth(req);
      return await handler(req, user);

    } catch (error: any) {
      if (error?.status === 401) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      console.error("withAuth error:", error);
      return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
  };
}
