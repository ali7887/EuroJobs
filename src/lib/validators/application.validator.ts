import { z } from 'zod';

export const applicationCreateSchema = z.object({
  jobId: z.string().uuid('Invalid job ID'),
  userId: z.string().uuid('Invalid user ID'),
  coverLetter: z.string().max(2000).optional(),
});

export const applicationStatusSchema = z.object({
  status: z.enum([
    'PENDING',
    'REVIEWING',
    'INTERVIEWED',
    'ACCEPTED',
    'REJECTED',
  ]),
});
