import styles from "./FeaturedJobs.module.css";

export default function FeaturedJobsSkeleton() {
  return (
    <div className={styles.skeletonGrid}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className={styles.skeleton}></div>
      ))}
    </div>
  );
}
