"use server";

import { db } from "@/lib/db";
import { jobs } from "@/lib/db/schema";
import { redirect } from "next/navigation";

export async function createJob(formData: FormData): Promise<void> {
  const title = formData.get("title") as string;

  await db.insert(jobs).values({
    title,
    companyId: "demo-company-id",
    employerId: "demo-employer-id",
    published: true,
  });

  redirect("/admin/jobs");
}
