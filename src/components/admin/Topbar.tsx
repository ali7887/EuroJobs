"use client";

export default function Topbar({
  onMenuClick,
}: {
  onMenuClick: () => void;
}) {
  return (
    <header className="admin-topbar">
      <button className="admin-menu-btn" onClick={onMenuClick}>
        ☰
      </button>

      <div className="admin-topbar-title">Admin Panel</div>

      <div className="admin-topbar-user">
        <span>Admin</span>
      </div>
    </header>
  );
}
