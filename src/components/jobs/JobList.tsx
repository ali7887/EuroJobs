import React from "react";
import { mapJobType } from "@/lib/utils/job.utils";
import type { InferModel } from "drizzle-orm";
import { jobs } from "@/lib/db/schema";

type Job = InferModel<typeof jobs>;

interface Props {
  jobs: Job[];
}

export function JobList({ jobs }: Props) {
  return (
    <div className="job-list">
      {jobs.map((job) => {
        const safeType = mapJobType(job.type ?? "Full-time");

        return (
          <div key={job.id} className="job-card">
            <h3>{job.title}</h3>

            <p>{job.description}</p>

            <p>نوع شغل: {safeType}</p>
            <p>شرکت: {job.companyId}</p>

            <p>
              ثبت شده در:{" "}
              {job.createdAt
                ? new Date(job.createdAt).toLocaleDateString("fa-IR")
                : "نامشخص"}
            </p>
          </div>
        );
      })}
    </div>
  );
}
