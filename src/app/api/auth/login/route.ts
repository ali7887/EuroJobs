import { NextResponse } from 'next/server'
import { issueTokenPair } from '@/lib/tokens/token.service'
import { setRefreshCookie } from '@/lib/cookies/cookie.utils'
import { findByEmail, toSafeUser } from '@/modules/users/user.repository'
import { verifyPassword } from '@/modules/users/user.service'

export async function POST(req: Request) {
  const { email, password } = await req.json()

  const user = await findByEmail(email)
  
  if (!user) {
    return NextResponse.json(
      { error: 'Invalid email or password' },
      { status: 401 }
    )
  }

  const valid = await verifyPassword(password, user.password)
  
  if (!valid) {
    return NextResponse.json(
      { error: 'Invalid email or password' },
      { status: 401 }
    )
  }

  const { accessToken, refreshToken } = await issueTokenPair(user.id, user.role)

  await setRefreshCookie(refreshToken)

  return NextResponse.json({
    accessToken,
    user: toSafeUser(user),
  })
}
