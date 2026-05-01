export default function StatsCards({ stats, small = false }: any) {
  return (
    <div className={`stats-grid ${small ? "stats-grid-small" : ""}`}>
      <div className="stat-card stat-card-small">
        <div className="stat-title">Total Users</div>
        <div className="stat-value">{stats.totalUsers}</div>
      </div>

      <div className="stat-card stat-card-small">
        <div className="stat-title">Total Jobs</div>
        <div className="stat-value">{stats.totalJobs}</div>
      </div>

      <div className="stat-card stat-card-small">
        <div className="stat-title">Active Companies</div>
        <div className="stat-value">{stats.activeCompanies}</div>
      </div>

      <div className="stat-card stat-card-small">
        <div className="stat-title">Monthly Revenue</div>
        <div className="stat-value">${stats.monthlyRevenue}</div>
      </div>
    </div>
  );
}
