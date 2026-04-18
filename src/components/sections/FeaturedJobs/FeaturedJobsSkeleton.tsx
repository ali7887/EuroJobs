// FeaturedJobsSkeleton.tsx
import React from "react";
import styles from "./FeaturedJobCard.module.css";

export default function FeaturedJobsSkeleton() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1rem" }}>
      {[...Array(6)].map((_, i) => (
        <div key={i} className={styles.card} style={{ opacity: 0.4 }}>
          <div className={styles.header}>
            <div className={styles.logo}></div>
            <div style={{ flex: 1 }}>
              <div style={{ height: "16px", background: "rgba(255,255,255,0.1)", marginBottom: "6px", borderRadius: "4px" }} />
              <div style={{ height: "12px", background: "rgba(255,255,255,0.05)", borderRadius: "4px", width: "60%" }} />
            </div>
          </div>

          <div className={styles.skillsContainer}>
            {[...Array(4)].map((_, j) => (
              <span key={j} style={{
                display: "inline-block",
                background: "rgba(255,255,255,0.05)",
                width: "80px",
                height: "18px",
                borderRadius: "8px"
              }} />
            ))}
          </div>

          <div className={styles.analytics}>
            {[...Array(3)].map((_, j) => (
              <div key={j} style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px"
              }}>
                <div style={{ height: "10px", background: "rgba(255,255,255,0.05)", width: "50px", borderRadius: "4px" }} />
                <div style={{ height: "14px", background: "rgba(255,255,255,0.1)", width: "30px", borderRadius: "4px" }} />
              </div>
            ))}
          </div>

          <div className={styles.cta} style={{ opacity: 0.7 }}>
            &nbsp;
          </div>
        </div>
      ))}
    </div>
  );
}
