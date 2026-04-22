import { NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/jwt/jwt.utils";
export const runtime = "nodejs";

const employerRoutes = ["/dashboard/employer"];

export async function middleware(req: Request) {
  const url = new URL(req.url);
  const path = url.pathname;

  // فقط برای مسیرهای Employer
  if (employerRoutes.some((prefix) => path.startsWith(prefix))) {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const payload = await verifyAccessToken(token);

      if (payload.role !== "employer" && payload.role !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    } catch (err) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/employer/:path*"],
};
