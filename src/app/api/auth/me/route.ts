import { NextRequest, NextResponse } from 'next/server'
import { verifyAccessToken } from '@/lib/jwt/jwt.utils'
import { UserRepository } from '@/modules/users/user.repository'

export async function GET(req: NextRequest) {
  try {
    const auth = req.headers.get('authorization')

    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = auth.replace('Bearer ', '')

    const payload = await verifyAccessToken(token)

    const user = await UserRepository.findById(payload.userId)

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({
      user: UserRepository.toSafeUser(user)
    })
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}
