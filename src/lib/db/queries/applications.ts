import { applications, ApplicationStatus } from "@/lib/db/schema/applications";
import { db } from "..";
import { eq } from "drizzle-orm";

export async function updateApplicationStatus(
  id: string,
  status: ApplicationStatus
) {
  const [updated] = await db
    .update(applications)
    .set({ status })
    .where(eq(applications.id, id))
    .returning();

  return updated;
}
