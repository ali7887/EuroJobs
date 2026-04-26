import { NextResponse } from 'next/server';
import { verifyAccessToken } from '@/lib/jwt/jwt.utils';
import { userService } from '@/lib/services/user.service';

export const runtime = "nodejs";

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.slice(7);

  try {
    const payload: any = await verifyAccessToken(token);

    const userId: string | undefined = payload?.sub ?? payload?.userId;

    if (!userId) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // UUID ها string هستند → نیازی به Number() نیست
    const user = await userService.getById(userId);

    return NextResponse.json({ data: user });

  } catch (err) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
