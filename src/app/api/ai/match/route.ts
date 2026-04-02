import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { MatcherService } from '@/app/api/ai/match/matcher.service';
import { getDb } from '@/infrastructure/lowdb.client';

const schema = z.object({
  skills: z.array(z.string()).min(1).max(20),
});

const matcher = new MatcherService();

export async function POST(req: NextRequest) {
  const userId = req.headers.get('x-user-id');
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const db = await getDb();
  const jobs = db.data.jobs.filter((j) => j.status === 'active');

  const matches = await matcher.findMatchingJobs(parsed.data.skills, jobs);
  return NextResponse.json({ matches });
}
