// D:\project\NEW\job-board-saas\src\components\admin\dashboard\AIActivity.tsx

type ActivityItem = {
  id: string;
  action: string;
  time?: string;
  timestamp?: string;
};

export default function AIActivity({ activity = [] }: { activity?: ActivityItem[] }) {
  const safeActivity = Array.isArray(activity) ? activity : [];

  return (
    <div className="card">
      <h3 className="card-title">AI Activity</h3>

      {safeActivity.length === 0 ? (
        <p className="empty">No AI activity yet.</p>
      ) : (
        <ul className="list">
          {safeActivity.map((a) => (
            <li key={a.id} className="list-row">
              <span>{a.action}</span>
              <span className="list-muted">{a.time || a.timestamp}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
