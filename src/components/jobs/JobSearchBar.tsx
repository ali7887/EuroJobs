"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import "./JobSearchBar.css";

export default function JobSearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [location, setLocation] = useState(searchParams.get("location") ?? "");
  const [type, setType] = useState(searchParams.get("type") ?? "");

  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    const params = new URLSearchParams();

    if (debouncedSearch) params.set("search", debouncedSearch);
    if (location) params.set("location", location);
    if (type) params.set("type", type);

    router.push(`/jobs?${params.toString()}`);
  }, [debouncedSearch, location, type, router]);

  return (
    <div className="job-search">

      <input
        type="text"
        placeholder="Search jobs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="job-search-input"
      />

      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="job-search-select"
      >
        <option value="">All locations</option>
        <option value="remote">Remote</option>
        <option value="berlin">Berlin</option>
        <option value="london">London</option>
      </select>

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="job-search-select"
      >
        <option value="">All types</option>
        <option value="full-time">Full Time</option>
        <option value="part-time">Part Time</option>
        <option value="contract">Contract</option>
      </select>

    </div>
  );
}
