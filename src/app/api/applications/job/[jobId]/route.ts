import { NextRequest, NextResponse } from 'next/server';
import { ApplicationService } from '@/lib/services/application.service';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const { jobId } = await params;
  const applications = await ApplicationService.getApplicationsByJob(jobId);
  return NextResponse.json(applications);
}
