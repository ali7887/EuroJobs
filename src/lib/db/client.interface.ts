// src/lib/db/client.interface.ts
import type { Database, Job, User, Application, Company, Category, JobEmbeddingRecord, StoredRefreshToken } from './schema';

export interface DatabaseClient {
  // Read operations
  read(): Promise<void>;
  
  // Write operations
  write(): Promise<void>;
  
  // Data access
  get data(): Database;
  
  // Collection helpers
  jobs: CollectionOperations<Job>;
  users: CollectionOperations<User>;
  applications: CollectionOperations<Application>;
  companies: CollectionOperations<Company>;
  categories: CollectionOperations<Category>;
  jobEmbeddings: CollectionOperations<JobEmbeddingRecord>;
  refreshTokens: CollectionOperations<StoredRefreshToken>;
}

export interface CollectionOperations<T> {
  findAll(): T[];
  findById(id: string): T | undefined;
  findOne(predicate: (item: T) => boolean): T | undefined;
  findMany(predicate: (item: T) => boolean): T[];
  insert(item: T): void;
  update(id: string, updates: Partial<T>): T | null;
  delete(id: string): boolean;
}
