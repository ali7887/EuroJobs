import { NextRequest, NextResponse } from 'next/server'
import { authService } from '@/lib/auth/auth.service'
import {
  getRefreshTokenFromCookie,
  clearRefreshTokenCookie
} from '@/lib/auth/cookie.utilities'

export async function POST(req: NextRequest) {
  try {
    const refreshToken = getRefreshTokenFromCookie(req)

    if (refreshToken) {
      await authServicelogout(refreshToken)
    }

    const res = NextResponse.json({ success: true })

    clearRefreshTokenCookie(res)

    return res
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode ?? 500 }
    )
  }
}

function authServicelogout(refreshToken: string) {
  throw new Error('Function not implemented.')
}
