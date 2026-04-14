import Sidebar from "./components/Sidebar";
import DashboardHeader from "./components/DashboardHeader";
import styles from "./layout.module.css";

export default function EmployerDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <Sidebar />

      <div className={styles.main}>
        <DashboardHeader />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
