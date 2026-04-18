"use client";

import Link from "next/link";
import { Code, Palette, TrendingUp, Users, Wrench, FileText } from 'lucide-react';
import { MainLayout } from '@/components/layout';
import Hero from '@/components/sections/Hero/Hero';
import { CategoryCard } from '@/components/ui/CategoryCard/CategoryCard';

import styles from './page.module.css';

// Featured jobs data
import featuredJobs from "@/components/sections/FeaturedJobs/data";

// ❗ باید این را اضافه کنی
import FeaturedJobs from "@/components/sections/FeaturedJobs/FeaturedJobs";

// Categories
let categories = [
  { icon: Code, name: 'Engineering', count: 1234 },
  { icon: Palette, name: 'Design', count: 567 },
  { icon: TrendingUp, name: 'Marketing', count: 890 },
  { icon: Users, name: 'Sales', count: 432 },
  { icon: Wrench, name: 'Product', count: 321 },
  { icon: FileText, name: 'Content', count: 234 },
];

const maxCount = Math.max(...categories.map((c) => c.count));
const TRENDING_THRESHOLD = 0.85;
const userSkills = ["React", "Next.js", "TypeScript"];

categories = categories.map((cat) => ({
  ...cat,
  trending: cat.count >= maxCount * TRENDING_THRESHOLD,
}));

export default function HomePage() {
  return (
    <MainLayout>

      <Hero />

      {/* FEATURED JOB OPPORTUNITIES */}
      <FeaturedJobs
        jobs={featuredJobs}
        userSkills={userSkills}
      />

      {/* POPULAR CATEGORIES */}
      <section className={styles.section}>
        <div className={styles.container}>

          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Popular Categories</h2>
            <p className={styles.sectionSubtitle}>
              Explore opportunities across the most in-demand fields in today’s tech landscape
            </p>
          </div>

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

    </MainLayout>
  );
}
