// src/app/api/ai/match/matcher.types.ts

export interface JobEmbeddingRecord {
  id: number;             // PK در دیتابیس (serial)
  jobId: number;          // ارجاع به jobs.id
  embedding: number[];    // بردار embedding
  updatedAt: Date | null        // آخرین زمان بروزرسانی
}

export interface MatchResult {
  jobId: number;
  jobTitle: string;
  score: number;          // 0..100
  reasons: string[];
  missingSkills: string[];
}
