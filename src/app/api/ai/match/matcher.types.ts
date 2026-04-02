export interface MatchResult {
  jobId: string;
  jobTitle: string;
  score: number;          // 0-100
  reasons: string[];
  missingSkills: string[];
}

export interface JobEmbeddingRecord {
  jobId: string;
  embedding: number[];
  updatedAt: string;
}
