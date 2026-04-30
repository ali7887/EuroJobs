import { db } from "@/lib/db";
import { jobs } from "@/lib/db/schema";
import { users } from "@/lib/db/schema";
import { companies } from "@/lib/db/schema";
import { count } from "drizzle-orm";

export async function getAdminStats() {
  const [jobsCount] = await db.select({ value: count() }).from(jobs);
  const [usersCount] = await db.select({ value: count() }).from(users);
  const [companiesCount] = await db.select({ value: count() }).from(companies);

  return {
    jobs: jobsCount.value,
    users: usersCount.value,
    companies: companiesCount.value,
  };
}
