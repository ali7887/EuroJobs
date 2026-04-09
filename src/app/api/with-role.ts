import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/auth.guard";

export function withRole(
  roles: string[],
  handler: (req: NextRequest, user: any) => Promise<Response>
) {

  return async function (req: NextRequest) {

    try {

      const user = await requireAuth();

      if (!roles.includes(user.role)) {

        return NextResponse.json(
          { message: "Forbidden" },
          { status: 403 }
        );

      }

      return handler(req, user);

    } catch (error) {

      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );

    }

  };

}
