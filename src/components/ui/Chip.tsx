import React from "react";
import styles from "./Chip.module.css";

interface ChipProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function Chip({
  children,
  active,
  onClick,
  className = ""
}: ChipProps) {
  return (
    <button
      className={`${styles.chip} ${active ? styles.active : ""} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
