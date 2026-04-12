import { z } from "zod"

export const createJobSchema = z.object({

  title: z
    .string()
    .min(3)
    .max(120),

  description: z
    .string()
    .min(20),

  companyName: z
    .string()
    .min(2),

  location: z
    .string()
    .optional(),

  salary: z
    .number()
    .int()
    .positive()
    .optional(),

  isRemote: z
    .boolean()
    .optional()
})

export type CreateJobInput = z.infer<typeof createJobSchema>
