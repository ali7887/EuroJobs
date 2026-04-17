"use client";

import Link from "next/link";
import { Code, Palette, TrendingUp, Users, Wrench, FileText } from 'lucide-react';
import { MainLayout } from '@/components/layout';
import Hero from '@/components/sections/Hero/Hero';
import { CategoryCard } from '@/components/ui/CategoryCard/CategoryCard';
import FeaturedJobs from "@/components/sections/FeaturedJobs/FeaturedJobs";
import styles from './page.module.css';

// Categories
let categories = [
  { icon: Code, name: 'Engineering', count: 1234 },
  { icon: Palette, name: 'Design', count: 567 },
  { icon: TrendingUp, name: 'Marketing', count: 890 },
  { icon: Users, name: 'Sales', count: 432 },
  { icon: Wrench, name: 'Product', count: 321 },
  { icon: FileText, name: 'Content', count: 234 },
];

// Trending logic (85%+ of max)
const maxCount = Math.max(...categories.map((c) => c.count));
const TRENDING_THRESHOLD = 0.85;

categories = categories.map((cat) => ({
  ...cat,
  trending: cat.count >= maxCount * TRENDING_THRESHOLD,
}));

export default function HomePage() {
  return (
    <MainLayout>

      <Hero />

      <section className={styles.section}>
        <div className={styles.container}>

          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Popular Categories</h2>
            <p className={styles.sectionSubtitle}>
              Explore opportunities across the most in-demand fields in today’s tech landscape
            </p>
          </div>

          {/* View All */}
          <div className={styles.viewAll}>
            <Link href="/categories">View all categories →</Link>
          </div>

          <div className={styles.categoriesGrid}>
            {categories.map((cat) => (
              <CategoryCard key={cat.name} {...cat} />
            ))}
          </div>

        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Featured Opportunities</h2>
            <p className={styles.sectionSubtitle}>
              Hand-picked roles at high-growth companies
            </p>
          </div>
          <FeaturedJobs />
        </div>
      </section>

    </MainLayout>
  );
}

