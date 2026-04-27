export default function AIActivity({ activity }: any) {
  return (
    <div className="card">
      <h3 className="card-title">AI Activity</h3>

      <ul className="list">
        {activity.map((a: any) => (
          <li key={a.id} className="list-row">
            <span>{a.action}</span>
            <span className="list-muted">{a.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
