"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import JobList from "./JobList";

function JobsContent() {
  const searchParams = useSearchParams();
  const keyword  = searchParams.get("keyword")  ?? undefined;
  const location = searchParams.get("location") ?? undefined;
  const category = searchParams.get("category") ?? undefined;

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Job Listings</h1>
      <JobList keyword={keyword} location={location} category={category} />
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
