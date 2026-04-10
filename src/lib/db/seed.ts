import { drizzle } from "drizzle-orm/node-postgres";
import { users, jobs } from "./schema.ts";
import { eq } from "drizzle-orm";
import pkg from "pg";

const { Client } = pkg;

async function seed() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();

  const db = drizzle(client);

  console.log("🌱 Seeding database...");

  // حذف داده‌های قبلی (اختیاری)
  await db.delete(jobs);
  await db.delete(users);

  // کاربر اولیه
  const [admin] = await db
    .insert(users)
    .values({
      name: "Ali Admin",
      email: "ali@example.com",
    })
    .returning();

  console.log("User created:", admin);

  // شغل‌های نمونه
  const jobsData = [
    {
      title: "Frontend Developer (React/Next.js)",
      company: "TechNova",
      description: "Hiring Senior React/Next.js developer",
      userId: admin.id,
    },
    {
      title: "Full Stack Engineer (TS + Node)",
      company: "SoftCloud",
      description: "Node.js + TypeScript engineer needed",
      userId: admin.id,
    },
  ];

  const insertedJobs = await db.insert(jobs).values(jobsData).returning();

  console.log("Jobs inserted:", insertedJobs);

  await client.end();
  console.log("🌱 Seed complete!");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
