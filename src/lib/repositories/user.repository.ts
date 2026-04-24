import { db } from '@/lib/db/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import type { User, NewUser } from '@/lib/db/schema';

export class UserRepository {

  // -----------------------
  // Static implementations
  // -----------------------
  static async findById(id: string): Promise<User | null> {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    return result[0] ?? null;
  }

  static async findByEmail(email: string): Promise<User | null> {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return result[0] ?? null;
  }

  static async create(data: NewUser): Promise<User> {
    const result = await db
      .insert(users)
      .values(data)
      .returning();

    return result[0];
  }

  // If needed, implement static delete as well
  // static async delete(id: string) { ... }

  // --------------------------------
  // Instance-based implementations
  // --------------------------------
  async findAll(): Promise<User[]> {
    return db.select().from(users);
  }

  async findById(id: string): Promise<User | null> {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    return result[0] ?? null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return result[0] ?? null;
  }

  async create(data: NewUser): Promise<User> {
    const result = await db
      .insert(users)
      .values(data)
      .returning();

    return result[0];
  }

  async update(id: string, data: Partial<NewUser>): Promise<User | null> {
    const result = await db
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();

    return result[0] ?? null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await db
      .delete(users)
      .where(eq(users.id, id))
      .returning();

    return result.length > 0;
  }
}
