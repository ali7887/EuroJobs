// src/lib/cookies/cookie.utils.ts
import { cookies } from 'next/headers'

const REFRESH_COOKIE = 'refresh_token'

const COOKIE_OPTIONS = {
  httpOnly: true,      // JS نمیتونه بخونه — XSS protection
  secure: process.env.NODE_ENV === 'production',  // فقط HTTPS
  sameSite: 'lax' as const,   // CSRF protection
  path: '/api/auth',   // فقط برای auth routes
  maxAge: 7 * 24 * 60 * 60,   // 7 روز (ثانیه)
}

export async function setRefreshCookie(token: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(REFRESH_COOKIE, token, COOKIE_OPTIONS)
}

export async function getRefreshCookie(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get(REFRESH_COOKIE)?.value ?? null
}

export async function clearRefreshCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(REFRESH_COOKIE, '', { ...COOKIE_OPTIONS, maxAge: 0 })
}
