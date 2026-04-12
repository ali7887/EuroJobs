import { NextRequest, NextResponse } from "next/server"
import { authService } from "@/lib/auth/auth.service"
import {
  getRefreshTokenFromCookie,
  clearRefreshTokenCookie
} from "@/lib/auth/cookie.utilities"

export async function POST(req: NextRequest) {

  try {

    const refreshToken = getRefreshTokenFromCookie(req)

    if (refreshToken) {
      await authService.logout(refreshToken)
    }

    const res = NextResponse.json({
      success: true
    })

    clearRefreshTokenCookie(res)

    return res

  } catch (error) {

    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    )

  }

}
