import { NextRequest, NextResponse } from 'next/server';
import { applicationService } from '@/lib/services/application.service';

type Params = { params: Promise<{ userId: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { userId } = await params;
    const applications = await applicationService.getByUser(userId);
    return NextResponse.json(applications);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'User not found') {
        return NextResponse.json({ error: error.message }, { status: 404 });
      }
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
