"use client";

import { useState, useEffect } from "react";
import Card from "../ui/Card";
import { Application } from "@/lib/db-operations";

interface ApplicationListProps {
  userId: string;
}

export default function ApplicationList({ userId }: ApplicationListProps) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const response = await fetch(`/api/applications/user/${userId}`);
    const data = await response.json();
    setApplications(data);
    setLoading(false);
  };

  if (loading) return <div>Loading applications...</div>;

  return (
    <div className="space-y-4">
      {applications.map((app) => (
        <Card key={app.id}>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg">Job ID: {app.jobId}</h3>
              <p className="text-sm text-gray-500">
                Applied: {new Date(app.appliedAt).toLocaleDateString()}
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${
              app.status === "pending" ? "bg-yellow-100 text-yellow-800" :
              app.status === "accepted" ? "bg-green-100 text-green-800" :
              "bg-red-100 text-red-800"
            }`}>
              {app.status}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
}
