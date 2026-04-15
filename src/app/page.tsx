"use client";

import { Code, Palette, TrendingUp, Users, Wrench, FileText } from 'lucide-react';
import { MainLayout } from '@/components/layout';
import { SearchBar } from '@/components/sections/Hero';
import { CategoryCard } from '@/components/ui/CategoryCard/CategoryCard';
import styles from './page.module.css';
import FeaturedJobs from "@/components/sections/FeaturedJobs/FeaturedJobs";

const categories = [
  { icon: Code, name: 'Engineering', count: 1234, trending: true },
  { icon: Palette, name: 'Design', count: 567, trending: false },
  { icon: TrendingUp, name: 'Marketing', count: 890, trending: true },
  { icon: Users, name: 'Sales', count: 432, trending: false },
  { icon: Wrench, name: 'Product', count: 321, trending: false },
  { icon: FileText, name: 'Content', count: 234, trending: false },
];

const companies = [
  { name: 'Google', jobs: 45 },
  { name: 'Microsoft', jobs: 32 },
  { name: 'Spotify', jobs: 28 },
  { name: 'Netflix', jobs: 19 },
  { name: 'Amazon', jobs: 56 },
  { name: 'Meta', jobs: 41 },
];

export default function HomePage() {
  const handleSearch = (params: {
    keyword: string;
    location: string;
    category: string;
  }) => {
    console.log('Search triggered:', params);
  };

  return (
    <MainLayout>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Find Your Dream Job in <span className={styles.gradient}>Europe</span>
          </h1>

          <p className={styles.heroSubtitle}>
            Discover curated opportunities from top-tier tech companies.
          </p>

          <SearchBar onSearch={handleSearch} />

          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>12,450+</span>
              <span className={styles.statLabel}>Active Jobs</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statValue}>850+</span>
              <span className={styles.statLabel}>Companies</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Popular Categories</h2>
          </div>

          <div className={styles.categoriesGrid}>
            {categories.map((cat) => (
              <CategoryCard key={cat.name} {...cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs (Ultra Premium) */}
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

      {/* Companies Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Top Hiring Companies</h2>
          </div>

          <div className={styles.companiesGrid}>
            {companies.map((company) => (
              <div key={company.name} className={styles.companyCard}>
                <span className={styles.companyName}>{company.name}</span>
                <span className={styles.companyJobs}>{company.jobs} positions</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.footerDivider} />
    </MainLayout>
  );
}
