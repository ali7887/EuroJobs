import { LucideIcon } from 'lucide-react';
import styles from './CategoryCard.module.css';

interface CategoryCardProps {
  icon: LucideIcon;
  name: string;
  count: number;
}

export function CategoryCard({ icon: Icon, name, count }: CategoryCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.iconWrapper}>
        <Icon size={32} strokeWidth={1.5} />
      </div>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.count}>{count.toLocaleString()} jobs</p>
    </article>
  );
}
