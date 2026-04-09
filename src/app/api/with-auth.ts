import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/auth.guard";

export function withAuth(
  handler: (req: NextRequest, user: any) => Promise<Response>
) {

  return async function (req: NextRequest) {

    try {

      const user = await requireAuth();

      return handler(req, user);

    } catch (error) {

      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );

    }

  };

}
