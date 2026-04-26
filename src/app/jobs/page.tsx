import React from "react";
import JobList from "@/components/jobs/JobList";
import Pagination from "@/components/jobs/Pagination";
import JobSearchBar from "@/components/jobs/JobSearchBar";


export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;

  const BASE_URL =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${BASE_URL}/api/public/jobs?page=${page}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed to fetch jobs:", await res.text());
    return <div>Error loading jobs...</div>;
  }

  const data = await res.json();

  return (
    <div className="container">
      <h1>Jobs</h1>
      <JobSearchBar />

      {/* FIX: data.items instead of data.jobs */}
      <JobList jobs={data.items} />

      <Pagination
        totalPages={data.totalPages}
        currentPage={data.page}
      />
    </div>
  );
}
