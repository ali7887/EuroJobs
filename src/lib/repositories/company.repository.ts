import { db } from "../db/db";
import { companies } from "../db/schema";
import { eq } from "drizzle-orm";

export class CompanyRepository {
  static async findAll() {
    return await db.select().from(companies);
  }

  static async findById(id: number) {
    const result = await db.select().from(companies).where(eq(companies.id, id));
    return result[0] ?? null;
  }

  static async create(data: typeof companies.$inferInsert) {
    const result = await db.insert(companies).values(data).returning();
    return result[0];
  }

  static async update(id: number, data: Partial<typeof companies.$inferInsert>) {
    const result = await db.update(companies).set(data).where(eq(companies.id, id)).returning();
    return result[0] ?? null;
  }

  static async delete(id: number) {
    const result = await db.delete(companies).where(eq(companies.id, id)).returning();
    return result.length > 0;
  }
}
