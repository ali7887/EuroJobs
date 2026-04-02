import { getDb } from '@/infrastructure/lowdb.client';
import { JobEmbeddingRecord } from './matcher.types';

export class MatcherRepository {
  async saveEmbedding(record: JobEmbeddingRecord): Promise<void> {
    const db = await getDb();
    // اضافه کردن jobEmbeddings به schema اگر وجود نداشت
    if (!db.data.jobEmbeddings) db.data.jobEmbeddings = [];
    
    const idx = db.data.jobEmbeddings.findIndex((e) => e.jobId === record.jobId);
    if (idx >= 0) {
      db.data.jobEmbeddings[idx] = record;
    } else {
      db.data.jobEmbeddings.push(record);
    }
    await db.write();
  }

  async getAllEmbeddings(): Promise<JobEmbeddingRecord[]> {
    const db = await getDb();
    return db.data.jobEmbeddings ?? [];
  }
}
