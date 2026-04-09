import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {

  const token = req.cookies.get("accessToken");

  const protectedPaths = [
    "/admin",
    "/employer",
    "/candidate"
  ];

  const isProtected = protectedPaths.some(path =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !token) {

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
