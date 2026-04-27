export default function SkeletonDashboard() {
  return (
    <div className="dashboard-container skeleton-animate">
      
      <div className="stats-grid">
        {[1,2,3,4].map(id => (
          <div key={id} className="skeleton-box"></div>
        ))}
      </div>

      <div className="charts-grid">
        <div className="skeleton-box large"></div>
        <div className="skeleton-box large"></div>
      </div>

      <div className="dashboard-three-grid">
        <div className="skeleton-box medium"></div>
        <div className="skeleton-box medium"></div>
        <div className="skeleton-box medium"></div>
      </div>

    </div>
  );
}
