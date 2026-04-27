import StatsCards from "../../../../components/admin/dashboard/StatsCards";
import RecentJobs from "../../../../components/admin/dashboard/RecentJobs";
import RecentUsers from "../../../../components/admin/dashboard/RecentUsers";
import AIActivity from "../../../../components/admin/dashboard/AIActivity";
import Charts from "./Charts";
import { AdminStats } from "@/types/admin";
import SkeletonDashboard from "./SkeletonDashboard";

export default async function DashboardPage() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/stats`, {
    cache: "no-store",
  }).then(r => r.json()).catch(() => null);

  if (!data) return <SkeletonDashboard />;

  return (
    <div className="dashboard-container">
      <StatsCards stats={data.stats} />
      <Charts />

      <div className="dashboard-three-grid">
        <RecentJobs jobs={data.recentJobs} />
        <RecentUsers users={data.recentUsers} />
        <AIActivity activity={data.aiActivity} />
      </div>
    </div>
  );
}