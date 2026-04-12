import { NextRequest, NextResponse } from "next/server"
import { authService } from "@/lib/auth/auth.service"
import { getRefreshTokenFromCookie } from "@/lib/auth/cookie.utilities"

export async function POST(req: NextRequest) {

  try {

    const refreshToken = getRefreshTokenFromCookie(req)

    if (!refreshToken) {
      return NextResponse.json(
        { error: "Missing refresh token" },
        { status: 401 }
      )
    }

    const tokens = await authService.refresh(refreshToken)

    const res = NextResponse.json({
      tokens: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken
      }
    })

    res.cookies.set("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax"
    })

    return res

  } catch (error) {

    return NextResponse.json(
      { error: (error as Error).message },
      { status: 401 }
    )

  }

}
