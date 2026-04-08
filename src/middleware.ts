import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"

const PUBLIC_ROUTES = [
  "/api/auth/login",
  "/api/auth/register"
]

export function middleware(request: NextRequest) {

  const { pathname } = request.nextUrl

  // allow public routes
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next()
  }

  // get token from header
  const authHeader = request.headers.get("authorization")

  if (!authHeader) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  const token = authHeader.replace("Bearer ", "")

  try {

    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET!
    )

    // attach user to headers
    const requestHeaders = new Headers(request.headers)

    requestHeaders.set(
      "x-user-id",
      (decoded as any).userId
    )

    return NextResponse.next({
      request: {
        headers: requestHeaders
      }
    })

  } catch (error) {

    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    )

  }
}
