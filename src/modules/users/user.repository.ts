import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export class UserRepository {
  getById(userId: string) {
    throw new Error('Method not implemented.');
  }
  async findByEmail(email: string) {
    const result = await db.select().from(users).where(eq(users.email, email.toLowerCase()));
    return result[0];
  }

  async findById(id: string) {
  return db.select().from(users).where(eq(users.id, id));
}


  async create(data: typeof users.$inferInsert) {
    const result = await db.insert(users).values(data).returning();
    return result[0];
  }

  async existsByEmail(email: string): Promise<boolean> {
    const result = await db.select({ id: users.id }).from(users).where(eq(users.email, email.toLowerCase()));
    return result.length > 0;
  }
}
