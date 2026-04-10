import { db } from "../db/db";
import { applications } from "../db/schema";
import { eq } from "drizzle-orm";

export class ApplicationRepository {

  static async findAll() {
    return await db.select().from(applications);
  }

  static async findById(id: number) {
    const result = await db
      .select()
      .from(applications)
      .where(eq(applications.id, id));

    return result[0] ?? null;
  }

  static async findByUserId(userId: number) {
    return await db
      .select()
      .from(applications)
      .where(eq(applications.userId, userId));
  }

  static async findByJobId(jobId: number) {
    return await db
      .select()
      .from(applications)
      .where(eq(applications.jobId, jobId));
  }

  static async create(data: typeof applications.$inferInsert) {
    const result = await db
      .insert(applications)
      .values(data)
      .returning();

    return result[0];
  }

  static async updateStatus(
    id: number,
    input: { status: string }
  ) {
    const result = await db
      .update(applications)
      .set({
        status: input.status,
        updatedAt: new Date()
      })
      .where(eq(applications.id, id))
      .returning();

    return result[0] ?? null;
  }

  static async delete(id: number) {
    const result = await db
      .delete(applications)
      .where(eq(applications.id, id))
      .returning();

    return result.length > 0;
  }

}
