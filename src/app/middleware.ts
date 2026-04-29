// src/app/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAccessToken } from "@/lib/jwt/jwt.utils";

export const runtime = "nodejs";

const employerRoutes = ["/dashboard/employer"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // فقط مسیرهای employer
  if (!employerRoutes.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const authHeader = req.headers.get("authorization");

  // اگر header نیست، یعنی navigation عادی → بفرست لاگین
  if (!authHeader) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const payload = await verifyAccessToken(token);

    if (!["employer", "admin"].includes(payload.role)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/employer/:path*"],
};
