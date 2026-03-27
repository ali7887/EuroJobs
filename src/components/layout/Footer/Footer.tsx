import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>JobBoard</h3>
            <p className={styles.description}>
              Modern job board platform connecting talent with opportunities.
            </p>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>For Job Seekers</h4>
            <Link href="/jobs" className={styles.link}>Browse Jobs</Link>
            <Link href="/companies" className={styles.link}>Companies</Link>
            <Link href="/resources" className={styles.link}>Resources</Link>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>For Employers</h4>
            <Link href="/post-job" className={styles.link}>Post a Job</Link>
            <Link href="/pricing" className={styles.link}>Pricing</Link>
            <Link href="/solutions" className={styles.link}>Solutions</Link>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Company</h4>
            <Link href="/about" className={styles.link}>About Us</Link>
            <Link href="/contact" className={styles.link}>Contact</Link>
            <Link href="/privacy" className={styles.link}>Privacy Policy</Link>
            <Link href="/terms" className={styles.link}>Terms of Service</Link>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} JobBoard. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
