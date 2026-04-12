//D:\project\NEW\job-board-saas\src\middleware.ts
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [
  "/admin",
  "/employer",
  "/candidate"
];

export function middleware(req: NextRequest) {

  const { pathname } = req.nextUrl;

  const isProtectedRoute = protectedRoutes.some(route =>
    pathname.startsWith(route)
  );

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const token = req.cookies.get("accessToken");

  if (!token) {

    const loginUrl = new URL("/login", req.url);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/employer/:path*",
    "/candidate/:path*"
  ]
};
