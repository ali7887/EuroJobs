import { db } from "./db";
import { v4 as uuidv4 } from "uuid";

async function seed() {
  const companyId = uuidv4();
  const company = {
    id: companyId,
    name: "Acme Corp",
    logo: "/logos/acme.png",
    website: "https://acme.com",
    createdAt: new Date().toISOString(),
    status: "active" as const,
    isActive: true,
  };
  db.data!.companies.push(company);

  const jobId = uuidv4();
  const job = {
    id: jobId,
    title: "Senior TypeScript Developer",
    description: "Build amazing products.",
    location: "Remote",
    salary: "$120,000",
    type: "full-time" as const,
    companyId,
    categoryId: uuidv4(),
    published: true,
    status: "active" as const,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  db.data!.jobs.push(job);

  await db.write();
  console.log("✅ Seed complete");
}

seed().catch(console.error);
