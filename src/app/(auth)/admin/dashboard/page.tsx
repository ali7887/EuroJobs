import StatsCards from "../../../../components/admin/dashboard/StatsCards";
import RecentJobs from "../../../../components/admin/dashboard/RecentJobs";
import RecentUsers from "../../../../components/admin/dashboard/RecentUsers";
import AIActivity from "../../../../components/admin/dashboard/AIActivity";
import Charts from "./Charts";

export default async function DashboardPage() {
  return (
    <div className="admin-dashboard">

      {/* KPI */}
      <section className="dashboard-section">
        <StatsCards
          stats={{
            totalUsers: 4320,
            totalJobs: 120,
            activeCompanies: 18,
            monthlyRevenue: 0,
          }}
        />
      </section>

      {/* Charts */}
      <section className="dashboard-section">
        <div className="chart-card">
          <h3 className="chart-title">Users Growth</h3>
          <Charts />
        </div>
      </section>

      {/* Lists */}
      <section className="dashboard-section grid-3">
        <RecentJobs />
        <RecentUsers />
        <AIActivity />
      </section>

    </div>
  );
}
