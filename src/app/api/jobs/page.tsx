// src/app/jobs/page.tsx
import { Loader } from '@/components/ui';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function JobsContent() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword');
  const location = searchParams.get('location');
  const category = searchParams.get('category');

  // Fetch jobs based on these params
  // ...
}

export default function JobsPage() {
  return (
    <Suspense fallback={<Loader fullScreen />}>
      <JobsContent />
    </Suspense>
  );
}
