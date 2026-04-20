//ok
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/auth.guard";

export function withAuth(
  handler: (req: NextRequest, user: any) => Promise<NextResponse>
) {
  return async function (req: NextRequest): Promise<NextResponse> {
    try {
      // 🟢 ارسال صحیح req به requireAuth
      const user = await requireAuth(req);

      // 🟢 اجرای هندلر با user احراز هویت‌شده
      return await handler(req, user);

    } catch (error: any) {

      // 🟡 اگر requireAuth خطای Authentication بدهد
      if (error?.code === "UNAUTHORIZED" || error?.status === 401) {
        return NextResponse.json(
          { message: "Unauthorized" },
          { status: 401 }
        );
      }

      // 🔴 خطاهای دیگر (مثلاً دیتابیس، validation)
      console.error("withAuth error:", error);

      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  };
}
