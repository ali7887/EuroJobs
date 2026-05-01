// D:\project\NEW\job-board-saas\src\components\admin\dashboard\RecentUsers.tsx

type User = {
  id: string;
  name: string;
  email: string;
  joinedAt?: string;
};

export default function RecentUsers({ users = [] }: { users?: User[] }) {
  const safeUsers = Array.isArray(users) ? users : [];

  return (
    <div className="card">
      <h3 className="card-title">Recent Users</h3>

      {safeUsers.length === 0 ? (
        <p className="empty">No recent users found.</p>
      ) : (
        <ul className="list">
          {safeUsers.map((u) => (
            <li key={u.id} className="list-row">
              <span>{u.name}</span>
              <span className="list-muted">{u.email}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
