import { NextRequest, NextResponse } from 'next/server';
import { ApplicationService } from '@/lib/services/application.service';
import { ZodError } from 'zod';

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const application = await ApplicationService.getApplicationsByJob(id);
    return NextResponse.json(application);
  } catch (error) {
    if (error instanceof Error && error.message === 'Application not found') {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await req.json();
    const application = await ApplicationService.updateStatus(id, body);
    return NextResponse.json(application);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.message },
        { status: 400 },
      );
    }
    if (error instanceof Error) {
      if (error.message === 'Application not found') {
        return NextResponse.json({ error: error.message }, { status: 404 });
      }
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const result = await ApplicationService.deleteApplication(id);
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof Error && error.message === 'Application not found') {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
