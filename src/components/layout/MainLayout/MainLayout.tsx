import { ReactNode } from "react";
import { Header } from "../Header";
import { Footer } from "../Footer";
import styles from "./MainLayout.module.css";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Header />

      <div className={styles.layout}>
        <main className={styles.main}>{children}</main>
        <Footer />
      </div>
    </>
  );
};
