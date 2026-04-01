import { NextRequest, NextResponse } from 'next/server';
import { ApplicationService } from '@/lib/services/application.service';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const applications = await ApplicationService.getApplicationsByUser(id);
  return NextResponse.json(applications);
}
