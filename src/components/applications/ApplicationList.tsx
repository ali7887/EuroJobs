"use client";

import { useEffect, useState } from "react";
import { Application } from "@/lib/db/schema";

export default function ApplicationList({ jobId }: { jobId?: string }) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = jobId
      ? `/api/applications/job/${jobId}`
      : "/api/applications";
    fetch(url)
      .then((r) => r.json())
      .then((d) => setApplications(d))
      .finally(() => setLoading(false));
  }, [jobId]);

  if (loading) return <div>Loading applications...</div>;

  return (
    <ul className="space-y-2">
      {applications.map((app) => (
        <li key={app.id} className="border rounded p-3">
          <p className="text-sm font-medium">Job: {app.jobId}</p>
          <p className="text-sm text-muted-foreground">Status: {app.status}</p>
        </li>
      ))}
    </ul>
  );
}
