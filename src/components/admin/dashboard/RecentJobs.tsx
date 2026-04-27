export default function RecentJobs({ jobs }: any) {
  return (
    <div className="card">
      <h3 className="card-title">Recent Jobs</h3>

      <ul className="list">
        {jobs.map((j: any) => (
          <li key={j.id} className="list-row">
            <span>{j.title} — {j.company}</span>
            <span className="list-date">{j.createdAt}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
