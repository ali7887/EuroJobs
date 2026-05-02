// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // فقط مسیرهای /admin را محافظت می‌کنیم
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const accessToken = req.cookies.get("accessToken")?.value;

  // اگر کوکی نبود → redirect به login
  if (!accessToken) {
    return redirectToLogin(req);
  }

  try {
    const { payload } = await jwtVerify(accessToken, JWT_SECRET);

    // چک نقش admin
    if (payload.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // دسترسی مجاز
    return NextResponse.next();

  } catch (err) {
    // توکن خراب، منقضی یا تغییر داده شده
    return redirectToLogin(req);
  }
}

function redirectToLogin(req: NextRequest) {
  const loginUrl = new URL("/admin/login", req.url);
  loginUrl.searchParams.set("callbackUrl", "/admin/dashboard");
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"],
};
