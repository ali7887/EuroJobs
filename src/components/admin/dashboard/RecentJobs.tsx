// D:\project\NEW\job-board-saas\src\components\admin\dashboard\RecentJobs.tsx

type Job = {
  id: string;
  title: string;
  company: string;
  createdAt: string;
};

export default function RecentJobs({ jobs = [] }: { jobs?: Job[] }) {
  const safeJobs = Array.isArray(jobs) ? jobs : [];

  return (
    <div className="card">
      <h3 className="card-title">Recent Jobs</h3>

      {safeJobs.length === 0 ? (
        <p className="empty">No recent jobs found.</p>
      ) : (
        <ul className="list">
          {safeJobs.map((j) => (
            <li key={j.id} className="list-row">
              <span>
                {j.title} — {j.company}
              </span>
              <span className="list-date">{j.createdAt}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
