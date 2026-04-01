import { db } from "./db";
import { v4 as uuidv4 } from "uuid";

async function seed() {
  const userId = uuidv4();
  const companyId = uuidv4();
  const company = {
    id: companyId,
    name: "Acme Corp",
    logoUrl: "/logos/acme.png",
    website: "https://acme.com",
    createdBy: userId,
    createdAt: new Date().toISOString(),
  };
  db.data!.companies.push(company);

  const jobId = uuidv4();
  const job = {
    id: jobId,
    title: "Senior TypeScript Developer",
    description: "Build amazing products.",
    location: "Remote",
    jobType: "full-time" as const,
    salaryMin: 120000,
    salaryMax: 150000,
    companyId,
    categoryId: uuidv4(),
    isActive: true,
    createdAt: new Date().toISOString(),
  };
  db.data!.jobs.push(job);

  await db.write();
  console.log("✅ Seed complete");
}

seed().catch(console.error);
