import { aiSearchService } from "./ai-search.service";
import { keywordSearchService } from "./keyword-search.service";

export const hybridSearchService = {
  async search(query: string) {
    const [ai, keyword] = await Promise.all([
      aiSearchService.search(query),
      keywordSearchService.search(query),
    ]);

    const scores = new Map<number, number>();

    for (const item of ai) scores.set(item.id, (scores.get(item.id) ?? 0) + item.score * 0.65);
    for (const item of keyword) scores.set(item.id, (scores.get(item.id) ?? 0) + item.score * 0.35);

    const merged = new Map<number, any>();
    [...ai, ...keyword].forEach((job) => {
      if (!merged.has(job.id)) merged.set(job.id, job);
    });

    return [...merged.values()]
      .map((job) => ({ ...job, score: scores.get(job.id)! }))
      .sort((a, b) => b.score - a.score);
  },
};
