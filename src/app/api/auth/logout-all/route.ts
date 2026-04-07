import { NextRequest, NextResponse } from 'next/server'
import { authService } from '@/lib/auth/auth.service'
import { verifyAccessToken } from '@/lib/jwt/jwt.utils'
import { clearRefreshTokenCookie } from '@/lib/auth/cookie.utilities'

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization')

    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')

    const payload = await verifyAccessToken(token)

    await authServicelogoutAll(payload.userId)

    const res = NextResponse.json({ success: true })

    clearRefreshTokenCookie(res)

    return res
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 401 }
    )
  }
}

function authServicelogoutAll(userId: string) {
  throw new Error('Function not implemented.')
}
