import { getEmbedding, cosineSimilarity } from '@/app/api/ai/embeddings';
import { getOpenAIClient } from '@/app/api/ai/openai.client';
import { buildJobMatchPrompt } from '@/app/api/ai/prompts';
import { MatcherRepository } from './matcher.repository';
import { MatchResult } from './matcher.types';

const repo = new MatcherRepository();

export class MatcherService {
  // ایندکس کردن یک job (باید هنگام ایجاد/آپدیت job فراخوانی شود)
  async indexJob(jobId: string, jobText: string): Promise<void> {
    const embedding = await getEmbedding(jobText);
    await repo.saveEmbedding({
      jobId,
      embedding,
      updatedAt: new Date().toISOString(),
    });
  }

  // پیدا کردن بهترین job‌ها برای یک کاربر بر اساس مهارت‌هایش
  async findMatchingJobs(
    userSkills: string[],
    jobs: Array<{ id: string; title: string; description: string }>,
    topK = 5
  ): Promise<MatchResult[]> {
    const userText = `Skills: ${userSkills.join(', ')}`;
    const userEmbedding = await getEmbedding(userText);
    const allEmbeddings = await repo.getAllEmbeddings();

    // محاسبه similarity برای هر job
    const scored = allEmbeddings
      .map((record) => ({
        jobId: record.jobId,
        similarity: cosineSimilarity(userEmbedding, record.embedding),
      }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, topK);

    // گرفتن توضیح دقیق‌تر از GPT برای top matches
    const results: MatchResult[] = [];
    for (const { jobId, similarity } of scored) {
      const job = jobs.find((j) => j.id === jobId);
      if (!job) continue;

      const client = getOpenAIClient();
      const completion = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'user', content: buildJobMatchPrompt(userSkills, job.description) },
        ],
        response_format: { type: 'json_object' },
      });

      const parsed = JSON.parse(completion.choices[0].message.content ?? '{}');
      results.push({
        jobId,
        jobTitle: job.title,
        score: Math.round(similarity * 100),
        reasons: parsed.reasons ?? [],
        missingSkills: parsed.missingSkills ?? [],
      });
    }

    return results;
  }
}
