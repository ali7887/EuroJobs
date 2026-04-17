import { LucideIcon } from "lucide-react";
import Link from "next/link";
import styles from "./CategoryCard.module.css";

interface CategoryCardProps {
  icon: LucideIcon;
  name: string;
  count: number;
}

const MAX_JOBS = 1300;

export function CategoryCard({ icon: Icon, name, count }: CategoryCardProps) {
  const percent = Math.min((count / MAX_JOBS) * 100, 100);

  return (
    <Link href={`/jobs?category=${name.toLowerCase()}`} className={styles.card}>
      
      <div className={styles.iconWrapper}>
        <Icon size={30} strokeWidth={1.7} />
      </div>

      <h3 className={styles.name}>{name}</h3>

      <p className={styles.count}>{count.toLocaleString()} jobs</p>

      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${percent}%` }}
        />
      </div>

    </Link>
  );
}
