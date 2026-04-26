import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import "./applications.css";

export default async function ApplicationsDashboardPage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) return <p>Unauthorized</p>;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/me/applications`, {
    cache: "no-store",
  });

  const { applications } = await res.json();

  return (
    <div className="page-container">
      <h1 className="page-title">Your Applications</h1>

      <div className="applications-list">
        {applications.length === 0 && (
          <p className="empty-text">You have not applied to any jobs yet.</p>
        )}

        {applications.map((app: any) => (
          <div key={app.id} className="application-item">
            <h2 className="job-title">{app.job.title}</h2>

            <p className="status">
              Status: <span className="status-value">{app.status}</span>
            </p>

            <p className="date">
              Applied At: {new Date(app.createdAt).toLocaleDateString()}
            </p>

            <a href={`/jobs/${app.jobId}`} className="job-link">
              View job →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
