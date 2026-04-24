export interface MatchableJob {
  id: string;                  // UUID
  title: string | null;
  description: string | null;
}

export interface MatchResult {
  jobId: string;               // UUID
  jobTitle: string;
  score: number;
  reasons: string[];
  missingSkills: string[];
}

/**
 * رکورد Embedding ذخیره‌شده در DB
 */
export interface JobEmbeddingRecord {
  id: string;                  // UUID
  jobId: string;               // UUID
  embedding: number[];         // ذخیره در DB به صورت JSON
  updatedAt: Date | null;
}
