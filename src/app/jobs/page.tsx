import { Suspense } from 'react';
import { Loader } from '@/components/ui';
import { JobList } from '@/components/jobs/JobList';

function JobsContent() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Job Listings</h1>
      <JobList jobs={[]} />
    </main>
  );
}

export default function JobsPage() {
  return (
    <Suspense fallback={<Loader fullScreen />}>
      <JobsContent />
    </Suspense>
  );
}
