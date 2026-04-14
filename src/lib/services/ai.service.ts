import { getGapGPTClient } from "@/lib/ai/gapgpt.client";

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
    const client = getGapGPTClient();

    const response = await client.chat({
      model: "gpt-5.2",
      messages: [
        {
          role: "user",
          content: `
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
          `,
        },
      ],
    });

    return response.choices?.[0]?.message?.content ?? "";
  },
};
