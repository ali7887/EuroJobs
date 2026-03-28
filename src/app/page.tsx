'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layout';
import { Button, Input, Card, Badge } from '@/components/ui';
import styles from './page.module.css';

const categories = [
  { icon: '💻', name: 'Engineering', count: 1234 },
  { icon: '🎨', name: 'Design', count: 567 },
  { icon: '📊', name: 'Marketing', count: 890 },
  { icon: '💼', name: 'Sales', count: 432 },
  { icon: '🔧', name: 'Product', count: 321 },
  { icon: '📝', name: 'Content', count: 234 },
];

const featuredJobs = [
  {
    id: 1,
    logo: '🚀',
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'Remote',
    salary: '$120k - $180k',
    tags: ['React', 'TypeScript', 'Remote'],
    type: 'Full-time'
  },
  {
    id: 2,
    logo: '🎯',
    title: 'Product Designer',
    company: 'DesignHub',
    location: 'Berlin',
    salary: '$90k - $130k',
    tags: ['Figma', 'UI/UX', 'Hybrid'],
    type: 'Full-time'
  },
  {
    id: 3,
    logo: '⚡',
    title: 'DevOps Engineer',
    company: 'CloudScale',
    location: 'Amsterdam',
    salary: '$110k - $160k',
    tags: ['AWS', 'Kubernetes', 'Remote'],
    type: 'Contract'
  },
];

const companies = ['🏢', '🎪', '🏛️', '🏰', '🏭', '🏗️', '🏦', '🏨'];

export default function HomePage() {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    console.log('Searching:', { keyword, location });
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
            Discover thousands of opportunities from top companies across Europe
          </p>

          {/* Premium Search Bar */}
          <div className={styles.searchBar}>
            <div className={styles.searchInput}>
              <span className={styles.searchIcon}>🔍</span>
              <Input
                placeholder="Job title or keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className={styles.input}
              />
            </div>
            <div className={styles.searchDivider} />
            <div className={styles.searchInput}>
              <span className={styles.searchIcon}>📍</span>
              <Input
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={styles.input}
              />
            </div>
            <Button
              variant="primary"
              onClick={handleSearch}
              className={styles.searchButton}
            >
              Search Jobs
            </Button>
          </div>

          <div className={styles.heroCtas}>
            <Button variant="primary" size="lg">Find Jobs</Button>
            <Button variant="outline" size="lg">Post a Job</Button>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Popular Categories</h2>
          <div className={styles.categoriesGrid}>
            {categories.map((cat) => (
              <Card key={cat.name} className={styles.categoryCard}>
                <span className={styles.categoryIcon}>{cat.icon}</span>
                <h3 className={styles.categoryName}>{cat.name}</h3>
                <p className={styles.categoryCount}>{cat.count} jobs</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Featured Jobs</h2>
          <div className={styles.jobsGrid}>
            {featuredJobs.map((job) => (
              <Card key={job.id} className={styles.jobCard}>
                <div className={styles.jobHeader}>
                  <span className={styles.jobLogo}>{job.logo}</span>
                  <Badge variant="secondary">{job.type}</Badge>
                </div>
                <h3 className={styles.jobTitle}>{job.title}</h3>
                <p className={styles.jobCompany}>{job.company}</p>
                <div className={styles.jobMeta}>
                  <span>📍 {job.location}</span>
                  <span>💰 {job.salary}</span>
                </div>
                <div className={styles.jobTags}>
                  {job.tags.map((tag) => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>
                <Button variant="primary" fullWidth className={styles.applyButton}>
                  Apply Now
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Top Companies */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Top Companies Hiring</h2>
          <div className={styles.companiesGrid}>
            {companies.map((logo, idx) => (
              <div key={idx} className={styles.companyLogo}>
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
