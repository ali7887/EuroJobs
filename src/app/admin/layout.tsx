import "@/styles/admin.css";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-container">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">EuroJobs Admin</div>
        <nav className="admin-nav">
          <Link href="/admin/dashboard">Dashboard</Link>
          <Link href="/admin/jobs">Jobs</Link>
          <Link href="/admin/users">Users</Link>
          <Link href="/admin/companies">Companies</Link>
          <Link href="/admin/settings">Settings</Link>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="admin-main">
        {/* PROFILE LINK AREA */}
        <div className="profile-link-container">
          <Link href="/admin/settings" className="profile-link">
            Profile
          </Link>
        </div>

        {/* TOPBAR */}
        <div className="admin-topbar">
          <span>Admin Panel</span>
        </div>

        {/* CONTENT */}
        <div className="admin-content">{children}</div>
      </main>
    </div>
  );
}
