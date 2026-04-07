import { NextRequest, NextResponse } from 'next/server'
import { AuthService } from '@/lib/auth/auth.service'
import { setRefreshTokenCookie } from '@/lib/auth/cookie.utilities'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const result = await AuthService.register({
      email: body.email,
      password: body.password,
      name: body.name,
      role: body.role
    })

    const res = NextResponse.json({
      user: result.user,
      accessToken: result.tokens.accessToken
    })

    setRefreshTokenCookie(res, result.tokens.refreshToken)

    return res
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode ?? 500 }
    )
  }
}
