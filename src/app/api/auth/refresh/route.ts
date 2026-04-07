import { NextRequest, NextResponse } from 'next/server'
import { AuthService } from '@/lib/auth/auth.service'
import {getRefreshTokenFromCookie,setRefreshTokenCookie} from '@/lib/auth/cookie.utilities'

export async function POST(req: NextRequest) {
  try {
    const refreshToken = getRefreshTokenFromCookie(req)

    if (!refreshToken) {
      return NextResponse.json(
        { error: 'Missing refresh token' },
        { status: 401 }
      )
    }

    const result = await AuthService.refresh(refreshToken)

    const res = NextResponse.json({
      user: result.user,
      accessToken: result.tokens.accessToken
    })

    setRefreshTokenCookie(res, result.tokens.refreshToken)

    return res
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode ?? 401 }
    )
  }
}
