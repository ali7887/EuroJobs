import { jobRepository } from "@/lib/repositories/job.repository";

export const keywordSearchService = {
  async search(query: string) {
    const results = await jobRepository.search({ query }, 200, 0);

    return results.map((job: any) => ({
      ...job,
      score: 1,
    }));
  },
};
