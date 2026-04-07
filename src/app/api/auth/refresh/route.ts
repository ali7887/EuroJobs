import { NextRequest, NextResponse } from "next/server"
import { authService } from "@/lib/auth/auth.service"

export async function POST(req: NextRequest) {

  const refreshToken = req.cookies.get("refreshToken")?.value

  if (!refreshToken) {
    return NextResponse.json(
      { error: "Missing refresh token" },
      { status: 401 }
    )
  }

  const tokens = await authService.refresh(refreshToken)

  const res = NextResponse.json({
    accessToken: tokens.accessToken
  })

  res.cookies.set("refreshToken", tokens.refreshToken, {
    httpOnly: true,
    secure: false,
    path: "/",
  })

  return res
}
