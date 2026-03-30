import { z } from 'zod';

export const jobQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  search: z.string().optional(),
  location: z.string().optional(),
  type: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'REMOTE']).optional(),
  category: z.string().optional(),
});

export const jobCreateSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().min(50),
  location: z.string().min(2),
  salary: z.string().optional(),
  type: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'REMOTE']),
  companyId: z.string(),
  categoryId: z.string().optional(),
});

export type JobQuery = z.infer<typeof jobQuerySchema>;
export type JobCreate = z.infer<typeof jobCreateSchema>;
