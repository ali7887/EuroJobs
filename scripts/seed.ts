import "dotenv/config";

import { db } from "@/lib/db";
import { companies, jobs, users } from "../src/lib/db/schema";
import bcrypt from "bcryptjs";

async function seed() {
  console.log("🌱 Seeding PostgreSQL database...");

  // ترتیب delete مهم است به خاطر foreign key ها
  await db.delete(jobs);
  await db.delete(companies);
  await db.delete(users);

  // ساخت ادمین واقعی در postgres
  const passwordHash = await bcrypt.hash("Password123", 10);

  const [admin] = await db.insert(users).values({
    // اگر در schema برای id، defaultRandom() داری، این را حذف کن:
    // id: crypto.randomUUID(),
    email: "admin@jobboard.com",
    name: "Admin",
    passwordHash,
    role: "admin",
    
    // اگر در schema ستون updatedAt داری و notNull است، این خوب است:
    updatedAt: new Date(),
  }).returning();

  console.log("👤 Admin user created:", admin.email);

  // ساخت یک شرکت
  const [acme] = await db.insert(companies).values({
    // id را هم اگر defaultRandom() داری، ست نکن.
    // id: crypto.randomUUID(),
    name: "Acme Corp",
    ownerId: admin.id, // چون در type دیدیم ownerId الزامی است
    // می‌توانی بقیه را هم اضافه کنی اگر خواستی:
    // website: "https://acme.com",
    // description: "Tech company",
  }).returning();

  console.log("🏢 Company created:", acme.name);

  // ساخت چند شغل
  await db.insert(jobs).values([
    {
      // اگر jobs.id defaultRandom است، این را هم نگذار:
      // id: crypto.randomUUID(),
      title: "Senior Frontend Engineer",
      description: "React, Next.js, TypeScript",
      location: "Remote",
      level: "senior",        // باید با enum jobLevelEnum در schemaت بخواند
      companyId: acme.id,
      published: true,
      // اگر در schema ستون createdAt داری و notNull است، اضافه‌اش کن
      // createdAt: new Date(),
    },
    {
      title: "Junior Backend Developer",
      description: "Node.js, PostgreSQL",
      location: "On-site",
      level: "junior",
      companyId: acme.id,
      published: true,
      // createdAt: new Date(),
    }
  ]);

  console.log("💼 Jobs inserted.");
  console.log("✅ Done.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
