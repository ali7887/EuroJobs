// src/app/api/ai/match/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { MatcherService, matcherService } from '@/app/api/ai/match/matcher.service';
import { db } from '@/lib/db';
import { jobs } from '@/lib/db/schema';

const schema = z.object({
  skills: z.array(z.string()).min(1).max(20),
});

const matcher = new MatcherService();

export async function POST(req: NextRequest) {
  const userId = req.headers.get('x-user-id');
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { skills } = parsed.data;

  // همه jobهای active منتشر شده را بگیر (با توجه به schema خودت adjust کن)
  const jobRows = await db.select().from(jobs);
  const matchableJobs = jobRows.map((j) => ({
    id: j.id,
    title: j.title,
    description: j.description,
  }));

  const matches = await matcher.findMatchingJobs(skills, matchableJobs, 5);

  return NextResponse.json({ data: matches });
}
