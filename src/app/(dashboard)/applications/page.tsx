import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import "./applications.css";
import { auth } from "@/lib/auth/auth";export default async function ApplicationsDashboardPage() {
  const session = await auth();

  if (!session?.userId) return <p>Unauthorized</p>;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/me/applications`, {
    cache: "no-store",
  });

  const { applications } = await res.json();

  return (
    <div className="page-container">
      <h1 className="page-title">Your Applications</h1>
      <div className="applications-list">
        {applications.length === 0 && <p>You have not applied to any jobs yet.</p>}
        {applications.map((app: any) => (
          <div key={app.id} className="application-item">
            <h2>{app.job.title}</h2>
            <p>Status: {app.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
