// src/app/api/auth/logout/route.ts
import { getRefreshCookie, clearRefreshCookie } from '@/lib/cookies/cookie.utils'
import { verifyRefreshToken } from '@/lib/jwt/jwt.utils'
import { revokeToken } from '@/lib/tokens/token.repository'

export async function POST() {
  const refreshToken = await getRefreshCookie()

  if (refreshToken) {
    try {
      const payload = verifyRefreshToken(refreshToken)
      await revokeToken(payload.tokenId)  // DB از invalidate کن
    } catch {
      // token invalid بود — مهم نیست، cookie رو پاک کن
    }
  }

  await clearRefreshCookie()
  return Response.json({ success: true })
}
