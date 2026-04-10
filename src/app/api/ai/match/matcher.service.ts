import { MatcherRepository } from './matcher.repository';
import { db } from '@/lib/db';
import { jobs } from '@/lib/db/schema';

type MatchableJob = {
  id: number;
  title: string | null;
  description: string | null;
};

export class MatcherService {
  private repository = new MatcherRepository();

  /**
   * ساده‌ترین matcher فعلاً
   * بعداً می‌توان embedding یا AI اضافه کرد
   */
  async findMatchingJobs(
    skills: string[],
    jobList: MatchableJob[],
    limit = 5
  ): Promise<MatchableJob[]> {

    if (!skills.length) return [];

    const normalizedSkills = skills.map((s) => s.toLowerCase());

    const scored = jobList.map((job) => {
      const text =
        `${job.title ?? ''} ${job.description ?? ''}`.toLowerCase();

      let score = 0;

      for (const skill of normalizedSkills) {
        if (text.includes(skill)) score++;
      }

      return {
        job,
        score,
      };
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
