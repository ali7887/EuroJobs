import { z } from "zod"

export const applySchema = z.object({

resumeUrl:z.string().url().optional(),

coverLetter:z.string().max(2000).optional()

})
