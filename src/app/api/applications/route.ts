import { NextRequest, NextResponse } from 'next/server';
import { applicationService } from '@/lib/services/application.service';

export async function POST(req: NextRequest) {
  // اطلاعات user از middleware header می‌آید
  const userId = req.headers.get('x-user-id');
  const userRole = req.headers.get('x-user-role');

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (userRole !== 'JOBSEEKER') {
    return NextResponse.json(
      { error: 'Only job seekers can apply' },
      { status: 403 }
    );
  }

  try {
    const body = await req.json();
    const application = await applicationService.create({ ...body, userId });
    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
