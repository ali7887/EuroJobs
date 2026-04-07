// src/lib/repositories/matcher.repository.ts
import { randomUUID } from 'crypto';
import { dbClient } from '../db/lowdb.adapter';
import type { JobEmbeddingRecord } from '../db/schema';

export class MatcherRepository {

  async upsertEmbedding(
    jobId: string,
    embedding: number[],
  ): Promise<JobEmbeddingRecord> {
    await dbClient.read();

    const existing = dbClient.jobEmbeddings.findOne((r) => r.jobId === jobId);

    if (existing) {
      // ✅ id وجود دارد — update
      const updated = dbClient.jobEmbeddings.update(existing.id, {
        embedding,
        updatedAt: new Date().toISOString(),
      });
      await dbClient.write();
      return updated!;
    }

    // ✅ رکورد جدید با id
    const record: JobEmbeddingRecord = {
      id: randomUUID(),          // ✅ id اجباری برای LowDBCollectionOperations<T extends {id:string}>
      jobId,
      embedding,
      updatedAt: new Date().toISOString(),
    };

    dbClient.jobEmbeddings.insert(record);
    await dbClient.write();
    return record;
  }

  async getEmbeddingByJobId(jobId: string): Promise<JobEmbeddingRecord | null> {
    await dbClient.read();
    return dbClient.jobEmbeddings.findOne((r) => r.jobId === jobId) ?? null;
  }

  async getAllEmbeddings(): Promise<JobEmbeddingRecord[]> {
    await dbClient.read();
    return dbClient.jobEmbeddings.findAll();
  }

  async deleteByJobId(jobId: string): Promise<boolean> {
    await dbClient.read();
    const record = dbClient.jobEmbeddings.findOne((r) => r.jobId === jobId);
    if (!record) return false;
    const result = dbClient.jobEmbeddings.delete(record.id);
    await dbClient.write();
    return result;
  }
}

export const matcherRepository = new MatcherRepository();
