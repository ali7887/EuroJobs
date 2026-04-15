import React from "react";
import styles from "./FeaturedJobs.module.css";

export default function FeaturedJobsSkeleton() {
  return (
    <div className={styles.grid}>
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          style={{
            background: "#f3f3f3",
            height: "180px",
            borderRadius: "12px",
            animation: "pulse 1.5s infinite ease-in-out",
          }}
        />
      ))}
    </div>
  );
}
