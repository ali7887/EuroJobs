export default function RecentUsers({ users }: any) {
  return (
    <div className="card">
      <h3 className="card-title">Recent Users</h3>

      <ul className="list">
        {users.map((u: any) => (
          <li key={u.id} className="list-row">
            <span>{u.name}</span>
            <span className="list-muted">{u.email}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
