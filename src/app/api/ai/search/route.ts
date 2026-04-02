import { NextRequest, NextResponse } from 'next/server';
import { getEmbedding, cosineSimilarity } from '@/app/api/ai/embeddings';
import { getDb } from '@/infrastructure/lowdb.client';

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get('q');
  if (!query || query.length < 2) {
    return NextResponse.json({ error: 'Query too short' }, { status: 400 });
  }

  const [queryEmbedding, db] = await Promise.all([
    getEmbedding(query),
    getDb(),
  ]);

  const allEmbeddings = db.data.jobEmbeddings ?? [];

  // رتبه‌بندی job‌ها بر اساس semantic similarity
  const ranked = allEmbeddings
    .map((record) => ({
      jobId: record.jobId,
      score: cosineSimilarity(queryEmbedding, record.embedding),
    }))
    .filter((r) => r.score > 0.3)   // threshold برای حذف نتایج نامرتبط
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  const jobs = ranked.map(({ jobId, score }) => {
    const job = db.data.jobs.find((j) => j.id === jobId);
    return job ? { ...job, relevanceScore: Math.round(score * 100) } : null;
  }).filter(Boolean);

  return NextResponse.json({ jobs, query });
}
