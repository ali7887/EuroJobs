import { NextRequest, NextResponse } from 'next/server';
import { userService } from '@/lib/services/user.service';
import { ZodError } from 'zod';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const user = await userService.register(body);
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.message },
        { status: 400 },
      );
    }
    if (error instanceof Error) {
      if (error.message === 'Email already exists') {
        return NextResponse.json({ error: error.message }, { status: 409 });
      }
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
