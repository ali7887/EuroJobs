import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/lib/services/auth.service';
import { ZodError } from 'zod';

export async function POST(req: NextRequest) {

  try {

    const body = await req.json();

    const result = await authService.register(body);

    return NextResponse.json(result, { status: 201 });

  } catch (error) {

    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.message },
        { status: 400 }
      );
    }

    if (error instanceof Error) {

      if (error.message === 'User already exists') {
        return NextResponse.json({ error: error.message }, { status: 409 });
      }

      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
