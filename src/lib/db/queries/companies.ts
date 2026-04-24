import { db } from "@/lib/db";
import { companies } from "@/lib/db/schema/companies";
import { jobs } from "@/lib/db/schema/jobs";
import { eq } from "drizzle-orm";

export async function createCompany(data: {
  name: string;
  ownerId: string;
  logoUrl?: string;
  website?: string;
  description?: string;
}) {
  const [company] = await db.insert(companies).values(data).returning();
  return company;
}

export async function getCompanyById(id: string) {
  const [company] = await db
    .select()
    .from(companies)
    .where(eq(companies.id, id));

  return company;
}

export async function getCompanyJobs(companyId: string) {
  return db
    .select()
    .from(jobs)
    .where(eq(jobs.companyId, companyId));
}

export async function updateCompany(
  id: string,
  data: Partial<typeof companies.$inferInsert>
) {
  const [updated] = await db
    .update(companies)
    .set(data)
    .where(eq(companies.id, id))
    .returning();

  return updated;
}
