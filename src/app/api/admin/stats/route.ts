import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    stats: {
      totalUsers: 4123,
      totalJobs: 189,
      activeCompanies: 74,
      monthlyRevenue: 9200,
    },
    recentJobs: [
      { id: 1, title: "Frontend Developer", company: "Techify", createdAt: "2026-04-28" },
      { id: 2, title: "Backend Engineer", company: "NordicSoft", createdAt: "2026-04-27" },
    ],
    recentUsers: [
      { id: 1, name: "Sarah Johnson", email: "sarah@example.com" },
      { id: 2, name: "Mark Wilson", email: "mark@example.com" },
    ],
    aiActivity: [
      { id: 1, action: "Matched 14 jobseekers", time: "2 hours ago" },
      { id: 2, action: "Analyzed 9 new CVs", time: "6 hours ago" },
    ]
  });
}
