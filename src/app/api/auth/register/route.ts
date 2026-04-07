import { NextRequest, NextResponse } from "next/server"
import { authService } from "@/lib/auth/auth.service"
import { setRefreshTokenCookie } from "@/lib/auth/cookie.utilities"

export async function POST(req: NextRequest) {

  try {

    const body = await req.json()

    const result = await authService.register({
      email: body.email,
      password: body.password,
      name: body.name
    })

    const res = NextResponse.json(
      {
        user: result.user,
        accessToken: result.tokens.accessToken
      },
      { status: 201 }
    )

    setRefreshTokenCookie(
      res,
      result.tokens.refreshToken
    )

    return res

  } catch (error) {

    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    )

  }

}
