import { NextRequest, NextResponse } from 'next/server';
import { applicationService } from '@/lib/services/application.service';

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { id} = await params;
    const applications = await applicationService.getByJob(id);
    return NextResponse.json(applications);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Job not found') {
        return NextResponse.json({ error: error.message }, { status: 404 });
      }
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

