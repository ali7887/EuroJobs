import Link from 'next/link';
import styles from './CategoryCard.module.css';

interface CategoryCardProps {
  icon: any;
  name: string;
  count: number;
  trending?: boolean;
}

export function CategoryCard({ icon: Icon, name, count, trending }: CategoryCardProps) {
  const categoryColors: Record<string, string> = {
    Engineering: '#6366f1',
    Design: '#ec4899',
    Marketing: '#f59e0b',
    Sales: '#10b981',
    Product: '#8b5cf6',
    Content: '#3b82f6',
  };

  const maxCount = 1234; // for percentage calc
  const percentage = Math.round((count / maxCount) * 100);

  return (
    <Link href={`/jobs/${name.toLowerCase()}`} className={styles.card}>
      
      {trending && <div className={styles.badge}>🔥 Trending</div>}

      <div className={styles.iconWrapper} style={{ backgroundColor: categoryColors[name] + '15' }}>
        <Icon className={styles.icon} style={{ color: categoryColors[name] }} />
      </div>

      <h3 className={styles.title}>{name}</h3>

      <div className={styles.progressLabel}>
        <span>{count.toLocaleString()} jobs</span>
        <span className={styles.percent}>{percentage}%</span>
      </div>

      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${percentage}%`, backgroundColor: categoryColors[name] }}
        />
      </div>

    </Link>
  );
}
