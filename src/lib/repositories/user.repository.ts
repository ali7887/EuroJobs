import { db } from '@/lib/db/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import type { User, NewUser } from '@/lib/db/schema';

export class UserRepository {
  static findById(userId: number) {
    throw new Error("Method not implemented.");
  }
  static findByEmail(email: string) {
    throw new Error("Method not implemented.");
  }
  static create(arg0: { name: string; email: string; password: string; role: string; }) {
    throw new Error("Method not implemented.");
  }
  findAll() {
    throw new Error("Method not implemented.");
  }

  async findById(id: number): Promise<User | null> {

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

  async update(id: number, data: Partial<NewUser>): Promise<User | null> {

    const result = await db
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();

    return result[0] ?? null;
  }

  async delete(id: number): Promise<boolean> {

    const result = await db
      .delete(users)
      .where(eq(users.id, id))
      .returning();

    return result.length > 0;
  }

}
