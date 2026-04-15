import { z } from "zod";

export const applySchema = z.object({
  coverLetter: z.string().min(10, "Cover letter must be at least 10 chars"),
  resumeUrl: z.string().url("Invalid resume URL"),
  jobId: z.string().uuid(),
});
