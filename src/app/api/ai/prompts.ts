export const CAREER_ASSISTANT_SYSTEM = `
You are a helpful career assistant for a job board platform.
Help users find relevant jobs, improve their resumes, and prepare for interviews.
Be concise, professional, and actionable.
Always respond in the same language the user writes in.
`.trim();

export function buildJobMatchPrompt(userSkills: string[], jobDescription: string): string {
  return `
Analyze how well this candidate matches the job.
Candidate skills: ${userSkills.join(', ')}
Job description: ${jobDescription}
Return a JSON object: { score: number (0-100), reasons: string[], missingSkills: string[] }
`.trim();
}
