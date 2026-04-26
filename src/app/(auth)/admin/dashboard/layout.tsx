import styles from "./dashboard.module.css";
import React from "react";
type Props = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: Props) {
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <h2 className={styles.logo}>Admin</h2>

        <ul className={styles.menu}>
          <li><a href="/admin/dashboard">Dashboard</a></li>
          <li><a href="/admin/jobs">Jobs</a></li>
          <li><a href="/admin/companies">Companies</a></li>
          <li><a href="/admin/employers">Employers</a></li>
          <li><a href="/admin/candidates">Candidates</a></li>
          <li><a href="/admin/users">Users</a></li>
        </ul>
      </aside>

      <main className={styles.content}>
        {children}
      </main>
    </div>
  );
}
