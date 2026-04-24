import { MatcherRepository } from './matcher.repository';
import type { MatchableJob } from './matcher.types';

export class MatcherService {
  private repository = new MatcherRepository();

  /**
   * Matcher ساده براساس شمارش keywordها
   */
  async findMatchingJobs(
    skills: string[],
    jobList: MatchableJob[],
    limit = 5
  ): Promise<MatchableJob[]> {
    if (!skills.length) return [];

    const normalizedSkills = skills.map((s) => s.toLowerCase());

    const scored = jobList.map((job) => {
      const text = `${job.title ?? ''} ${job.description ?? ''}`.toLowerCase();

      let score = 0;
      for (const skill of normalizedSkills) {
        if (text.includes(skill)) score++;
      }

      return { job, score };
    });

    const sorted = scored
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((r) => r.job);

    return sorted;
  }
}

export const matcherService = new MatcherService();
