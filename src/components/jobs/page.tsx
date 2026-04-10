import { Suspense } from 'react';
import { JobList } from '@/components/jobs/JobList';

function JobsContent() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Job Listings</h1>
      {/* ✅ JobList بدون props هم کار می‌کند چون همه optional هستند */}
      <JobList jobs={[]} />
    </main>
  );
}

export default function JobsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JobsContent />
    </Suspense>
  );
}
