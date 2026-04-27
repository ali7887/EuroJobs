export default function StatsCards({ stats }: any) {
  const items = [
    { label: "Total Users", value: stats.totalUsers },
    { label: "Total Jobs", value: stats.totalJobs },
    { label: "Active Companies", value: stats.activeCompanies },
    { label: "Monthly Revenue ($)", value: stats.monthlyRevenue },
  ];

  return (
    <div className="stats-grid">
      {items.map((item, i) => (
        <div key={i} className="stats-card">
          <div className="stats-label">{item.label}</div>
          <div className="stats-value">{item.value}</div>
        </div>
      ))}
    </div>
  );
}
