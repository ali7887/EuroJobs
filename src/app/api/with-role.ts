//ok
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/auth.guard";

export function withRole(
  roles: string[],
  handler: (req: NextRequest, user: any) => Promise<NextResponse>
) {
  return async function (req: NextRequest): Promise<NextResponse> {
    try {
      // 🟢 req باید ارسال شود
      const user = await requireAuth(req);

      // 🛑 نقش غیرمجاز
      if (!roles.includes(user.role)) {
        return NextResponse.json(
          { message: "Forbidden" },
          { status: 403 }
        );
      }

      // 🟢 نقش مجاز → ادامه
      return await handler(req, user);

    } catch (error: any) {

      // 🟡 خطای Authentication
      if (error?.code === "UNAUTHORIZED" || error?.status === 401) {
        return NextResponse.json(
          { message: "Unauthorized" },
          { status: 401 }
        );
      }

      // 🔴 سایر خطاها
      console.error("withRole error:", error);

      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  };
}
