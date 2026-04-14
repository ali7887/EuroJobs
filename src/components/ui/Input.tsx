import React from "react";
import styles from "./form.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
}

export default function Input({ label, icon, ...props }: InputProps) {
  return (
    <div className={styles.inputGroup}>
      <label className={styles.label}>{label}</label>

      <div className={styles.inputWrapper}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <input className={styles.input} {...props} />
      </div>
    </div>
  );
}
