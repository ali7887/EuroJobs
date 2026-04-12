// services/ai.service.ts
import { gapgptRequest } from "@/lib/ai/gapgpt";

export const aiService = {
  generateJobDescription: async ({
    title,
    skills,
    seniority,
  }: {
    title: string;
    skills: string[];
    seniority: string;
  }) => {
    const userPrompt = `
Generate a professional, well‑structured job description.
Title: ${title}
Seniority: ${seniority}
Required Skills: ${skills.join(", ")}

Output format:
- Overview
- Responsibilities
- Required Skills
- Preferred Skills
- Benefits
    `;

    const result = await gapgptRequest({
      model: "gpt-5.2", 
      prompt: userPrompt,
    });

    return result;
  },
};
