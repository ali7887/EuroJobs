// src/lib/validators/job.validator.ts
import { z } from "zod";

export const jobCreateSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  location: z.string().min(1),
  type: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "REMOTE"]),
  companyId: z.string(),
  salary: z.string().optional(),
  categoryId: z.string().optional(),

  // ✅ فیلدهای اضافه‌شده
  published: z.boolean().optional().default(false),
  isActive: z.boolean().optional().default(true),
  jobType: z.string().optional(),
});

export const jobQuerySchema = z.object({
  search: z.string().optional(),
  location: z.string().optional(),
  type: z.string().optional(),
  category: z.string().optional(),
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
});
