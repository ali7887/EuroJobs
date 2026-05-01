import "@/styles/admin-dashboard.css";

import StatsCards from "../../../components/admin/dashboard/StatsCards";
import RecentJobs from "../../../components/admin/dashboard/RecentJobs";
import RecentUsers from "../../../components/admin/dashboard/RecentUsers";
import AIActivity from "../../../components/admin/dashboard/AIActivity";
import Charts from "./Charts";

export default async function DashboardPage() {
  return (
    <div className="dashboard-page">

      {/* ================= HEADER ================= */}
      <div className="dashboard-header">
        <h1 className="page-title">Dashboard</h1>
      </div>

      {/* ================= CHART ================= */}
      <div className="dashboard-grid">
        <div className="dashboard-card" style={{ height: 200 }}>
          <h3 className="chart-title">Users Growth</h3>
          <Charts />
        </div>
      </div>

      {/* ================= MINI STATS ================= */}
      <div className="dashboard-grid">
        <StatsCards
          small
          stats={{
            totalUsers: 4320,
            totalJobs: 120,
            activeCompanies: 18,
            monthlyRevenue: 0,
          }}
        />
      </div>

      {/* ================= THREE COLUMNS ================= */}
      <div className="dashboard-grid three-cols">
        <div className="dashboard-card">
          <RecentJobs />
        </div>

        <div className="dashboard-card">
          <RecentUsers />
        </div>

        <div className="dashboard-card">
          <AIActivity />
        </div>
      </div>

    </div>
  );
}
