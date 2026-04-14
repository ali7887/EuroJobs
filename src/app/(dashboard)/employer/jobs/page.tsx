"use client";

import { useEffect, useState } from "react";

export default function JobsListPage() {
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    fetch("/api/jobs/list", {
      headers: { Authorization: "Bearer " + token }
    })
      .then((r) => r.json())
      .then((data) => setJobs(data.jobs || []));
  }, []);

  return (
    <div>
      <h2 style={{ fontSize: "1.3rem", marginBottom: 16 }}>Your Jobs</h2>

      {jobs.length === 0 ? (
        <p>No job postings yet.</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li key={job.id} style={{ padding: 12, borderBottom: "1px solid #ddd" }}>
              <strong>{job.title}</strong>
              <p>{job.location}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
