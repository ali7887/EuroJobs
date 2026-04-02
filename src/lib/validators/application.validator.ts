import { z } from "zod";

export const applicationCreateSchema = z.object({
  jobId: z.string().uuid(),
  userId: z.string().uuid(),
  coverLetter: z.string().optional(),
  resumeUrl: z.string().url().optional(),
});

export const applicationUpdateSchema = z.object({
  status: z.enum(["pending", "reviewing", "accepted", "rejected"]).optional(),
  reviewedAt: z.string().datetime().optional(),
  reviewedBy: z.string().uuid().optional(),
});

export const applicationQuerySchema = z.object({
  jobId: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
  status: z.enum(["pending", "reviewing", "accepted", "rejected"]).optional(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().max(100).optional(),
});

export type ApplicationCreateInput = z.infer<typeof applicationCreateSchema>;
export type ApplicationUpdateInput = z.infer<typeof applicationUpdateSchema>;
export type ApplicationQueryInput = z.infer<typeof applicationQuerySchema>;
