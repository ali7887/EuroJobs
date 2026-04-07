// src/lib/db/lowdb.adapter.ts
import type { DatabaseClient, CollectionOperations } from './client.interface';
import type { Database, Job, User, Application, Company, Category, JobEmbeddingRecord, StoredRefreshToken } from './schema';
import { db, initDB } from './db';

class LowDBCollectionOperations<T extends { id: string }> implements CollectionOperations<T> {
  constructor(
    private collectionName: keyof Database,
    private getDB: () => Database
  ) {}

  findAll(): T[] {
    return this.getDB()[this.collectionName] as unknown as T[];
  }

  findById(id: string): T | undefined {
    const collection = this.getDB()[this.collectionName] as unknown as T[];
    return collection.find(item => item.id === id);
  }

  findOne(predicate: (item: T) => boolean): T | undefined {
    const collection = this.getDB()[this.collectionName] as unknown as T[];
    return collection.find(predicate);
  }

  findMany(predicate: (item: T) => boolean): T[] {
    const collection = this.getDB()[this.collectionName] as unknown as T[];
    return collection.filter(predicate);
  }

  insert(item: T): void {
    const collection = this.getDB()[this.collectionName] as unknown as T[];
    collection.push(item);
  }

  update(id: string, updates: Partial<T>): T | null {
    const collection = this.getDB()[this.collectionName] as unknown as T[];
    const index = collection.findIndex(item => item.id === id);
    
    if (index === -1) return null;
    
    collection[index] = { ...collection[index], ...updates };
    return collection[index];
  }

  delete(id: string): boolean {
    const collection = this.getDB()[this.collectionName] as unknown as T[];
    const index = collection.findIndex(item => item.id === id);
    
    if (index === -1) return false;
    
    collection.splice(index, 1);
    return true;
  }
}

class LowDBAdapter implements DatabaseClient {
  private initialized = false;

  async read(): Promise<void> {
    if (!this.initialized) {
      await initDB();
      this.initialized = true;
    }
    await db.read();
  }

  async write(): Promise<void> {
    await db.write();
  }

  get data(): Database {
    return db.data;
  }

  jobs = new LowDBCollectionOperations<Job>('jobs', () => this.data);
  users = new LowDBCollectionOperations<User>('users', () => this.data);
  applications = new LowDBCollectionOperations<Application>('applications', () => this.data);
  companies = new LowDBCollectionOperations<Company>('companies', () => this.data);
  categories = new LowDBCollectionOperations<Category>('categories', () => this.data);
  jobEmbeddings = new LowDBCollectionOperations<JobEmbeddingRecord>('jobEmbeddings', () => this.data);
  refreshTokens = new LowDBCollectionOperations<StoredRefreshToken>('refreshTokens', () => this.data);
}

// Singleton instance
export const dbClient = new LowDBAdapter();
