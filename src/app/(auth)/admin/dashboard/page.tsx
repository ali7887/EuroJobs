import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import styles from "./dashboard.module.css";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <h1 className={styles.title}>Admin Dashboard</h1>

      <div className={styles.welcome}>
        Welcome, <strong>{session?.user?.email}</strong>
      </div>

      <div className={styles.grid}>
        <a className={styles.card} href="/admin/jobs">Manage Jobs</a>
        <a className={styles.card} href="/admin/companies">Manage Companies</a>
        <a className={styles.card} href="/admin/employers">Manage Employers</a>
        <a className={styles.card} href="/admin/candidates">Manage Candidates</a>
        <a className={styles.card} href="/admin/users">Manage Users</a>
      </div>
    </div>
  );
}
