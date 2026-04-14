import React from "react";
import styles from "./auth.module.css";
import { Shield, CheckCircle, Lock } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      
      {/* LEFT - HERO */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.iconWrapper}>
            <Shield size={48} />
          </div>

          <h1 className={styles.title}>Secure Access to Your Account</h1>

          <p className={styles.subtitle}>
            Fast, modern and secure authentication experience.
          </p>

          <ul className={styles.bulletList}>
            <li><CheckCircle size={18} /> Safe & Secure Auth</li>
            <li><CheckCircle size={18} /> Fast Login with JWT</li>
            <li><CheckCircle size={18} /> Modern UI Experience</li>
          </ul>
        </div>
      </div>

      {/* RIGHT - FORM */}
      <div className={styles.formContainer}>
        <div className={styles.card}>
          {children}
        </div>
      </div>

    </div>
  );
}
