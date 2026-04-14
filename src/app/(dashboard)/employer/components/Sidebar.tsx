"use client";

import Link from "next/link";
import styles from "./Sidebar.module.css";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    { href: "/dashboard/employer", label: "Dashboard" },
    { href: "/dashboard/employer/jobs", label: "Jobs" },
    { href: "/dashboard/employer/jobs/create", label: "Create Job" },
  ];

  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.logo}>Employer Panel</h2>

      <nav>
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.link} ${
              pathname === item.href ? styles.active : ""
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
