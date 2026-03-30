'use client';

import { Code, Palette, TrendingUp, Users, Wrench, FileText } from 'lucide-react';
import { MainLayout } from '@/components/layout';
import { SearchBar } from '@/components/sections/Hero';
import { JobCard } from '@/components/ui/JobCard/JobCard';
import { CategoryCard } from '@/components/ui/CategoryCard/CategoryCard';
import styles from './page.module.css';

// ─── Data ────────────────────────────────────────────────────────────────────

const categories = [
  { icon: Code,      name: 'Engineering', count: 1234, trending: true  },
  { icon: Palette,   name: 'Design',      count: 567,  trending: false },
  { icon: TrendingUp,name: 'Marketing',   count: 890,  trending: true  },
  { icon: Users,     name: 'Sales',       count: 432,  trending: false },
  { icon: Wrench,    name: 'Product',     count: 321,  trending: false },
  { icon: FileText,  name: 'Content',     count: 234,  trending: false },
];

const featuredJobs = [
  {
    id: 1,
    logo: '🚀',
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'Remote',
    salary: '$120k – $180k',
    type: 'Full-time',
    tags: ['React', 'TypeScript', 'Next.js'],
    isNew: true,
    isFeatured: true,
    postedDate: '2 days ago',
    applicants: 45,
  },
  {
    id: 2,
    logo: '🎯',
    title: 'Product Designer',
    company: 'DesignHub',
    location: 'Berlin',
    salary: '$90k – $130k',
    type: 'Full-time',
    tags: ['Figma', 'UI/UX', 'Design Systems'],
    isNew: false,
    isFeatured: false,
    postedDate: '5 days ago',
    applicants: 32,
  },
  {
    id: 3,
    logo: '⚡',
    title: 'DevOps Engineer',
    company: 'CloudScale',
    location: 'Amsterdam',
    salary: '$110k – $160k',
    type: 'Contract',
    tags: ['AWS', 'Kubernetes', 'Docker'],
    isNew: true,
    isFeatured: false,
    postedDate: '1 week ago',
    applicants: 28,
  },
];

const companies = [
  { name: 'Google',    jobs: 45 },
  { name: 'Microsoft', jobs: 32 },
  { name: 'Spotify',   jobs: 28 },
  { name: 'Netflix',   jobs: 19 },
  { name: 'Amazon',    jobs: 56 },
  { name: 'Meta',      jobs: 41 },
  { name: 'Apple',     jobs: 23 },
  { name: 'Tesla',     jobs: 17 },
];

// ─── Page ────────────────────────────────────────────────────────────────────

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

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Find Your Dream Job in{' '}
            <span className={styles.gradient}>Europe</span>
          </h1>

          <p className={styles.heroSubtitle}>
            Discover thousands of opportunities from top companies
            across Europe
          </p>

          <SearchBar onSearch={handleSearch} />

          {/* Stats strip */}
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

            <div className={styles.statDivider} />

            <div className={styles.stat}>
              <span className={styles.statValue}>50K+</span>
              <span className={styles.statLabel}>Job Seekers</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Categories ───────────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Popular Categories</h2>
            <p className={styles.sectionSubtitle}>
              Explore jobs by category
            </p>
          </div>
          <div className={styles.categoriesGrid}>
            {categories.map((cat) => (
              <CategoryCard key={cat.name} {...cat} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Jobs ─────────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Featured Jobs</h2>
            <p className={styles.sectionSubtitle}>
              Hand-picked opportunities for you
            </p>
          </div>
          <div className={styles.jobsGrid}>
            {featuredJobs.map((job) => (
              <JobCard postedAt={''} key={job.id} {...job} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Top Companies ─────────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Top Companies Hiring</h2>
            <p className={styles.sectionSubtitle}>
              Join industry-leading organizations
            </p>
          </div>
          <div className={styles.companiesGrid}>
            {companies.map((company) => (
              <div key={company.name} className={styles.companyCard}>
                <span className={styles.companyName}>{company.name}</span>
                <span className={styles.companyJobs}>
                  {company.jobs} open positions
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer separator ──────────────────────────────────── */}
      <div className={styles.footerDivider} />

    </MainLayout>
  );
}