import { z } from "zod"

export const jobSearchSchema = z.object({

  search: z.string().optional(),

  location: z.string().optional(),

  salaryMin: z.coerce.number().optional(),

  salaryMax: z.coerce.number().optional(),

  jobType: z.string().optional(),

  tags: z
    .string()
    .transform(v => v.split(","))
    .optional(),

  page: z.coerce.number().default(1)

})
