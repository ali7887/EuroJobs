// D:\project\NEW\job-board-saas\middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // آزاد بودن مسیرهای auth و static
  if (
    pathname.startsWith("/api/auth") ||
    pathname === "/admin/login"
  ) {
    return NextResponse.next();
  }

  // فقط مسیرهای admin محافظت شوند
  if (pathname.startsWith("/admin")) {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // اگر لاگین نیست یا نقش اشتباه دارد
    if (!token || token.role !== "admin") {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("callbackUrl", "/admin/dashboard");
      return NextResponse.redirect(loginUrl);
    }
    if (token.role !== "admin") {
      return NextResponse.redirect("/unauthorized");
    }

  }

  // اجازه عبور در بقیه موارد
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
