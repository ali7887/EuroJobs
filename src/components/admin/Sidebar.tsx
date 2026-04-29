"use client";

import Link from "next/link";

export default function Sidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  return (
    <aside className={`admin-sidebar ${open ? "open" : ""}`}>
      <div className="admin-sidebar-header">
        <span className="admin-logo">EuroJobs Admin</span>

        <button
          className="admin-close-btn"
          onClick={() => setOpen(false)}
        >
          ✕
        </button>
      </div>

      <nav className="admin-nav">
        <Link href="/admin/dashboard">Dashboard</Link>
        <Link href="/admin/jobs">Jobs</Link>
        <Link href="/admin/users">Users</Link>
        <Link href="/admin/employers">Employers</Link>
        <Link href="/admin/companies">Companies</Link>

      </nav>
    </aside>
  );
}
