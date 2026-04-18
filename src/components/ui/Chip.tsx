import React from "react";
import styles from "./Chip.module.css";

type ChipProps = {
  label: string;
  active?: boolean;
  onClick?: () => void;
  removable?: boolean;
  onRemove?: () => void;
};

export default function Chip({
  label,
  active = false,
  onClick,
  removable = false,
  onRemove,
}: ChipProps) {
  return (
    <div
      className={`${styles.chip} ${active ? styles.active : ""}`}
      onClick={onClick}
    >
      {label}
      {removable && (
        <span className={styles.remove} onClick={onRemove}>
          ×
        </span>
      )}
    </div>
  );
}
