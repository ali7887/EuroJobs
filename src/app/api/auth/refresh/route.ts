// src/app/api/auth/refresh/route.ts
import { rotateRefreshToken } from '@/lib/tokens/token.service'
import { setRefreshCookie } from '@/lib/cookies/cookie.utils'
import { getRefreshCookie } from '@/lib/cookies/cookie.utils'

export async function POST() {
  const refreshToken = await getRefreshCookie()

  if (!refreshToken) {
    return Response.json({ error: 'No refresh token' }, { status: 401 })
  }

  try {
    const { accessToken, refreshToken: newRefreshToken } =
      await rotateRefreshToken(refreshToken)

    // cookie جدید set میشه (rotation)
    await setRefreshCookie(newRefreshToken)

    return Response.json({ accessToken })

  } catch (err: any) {
    const status = err.message === 'TOKEN_REUSE_DETECTED' ? 401 : 401
    return Response.json({ error: 'Session expired. Please login again.' }, { status })
  }
}
