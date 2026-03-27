'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          JobBoard
        </Link>

        <nav className={styles.nav}>
          <Link href="/jobs" className={styles.navLink}>Jobs</Link>
          <Link href="/companies" className={styles.navLink}>Companies</Link>
          <Link href="/pricing" className={styles.navLink}>Pricing</Link>
        </nav>

        <div className={styles.actions}>
          <Button variant="ghost" size="sm">Sign In</Button>
          <Button variant="primary" size="sm">Post a Job</Button>
        </div>

        <button
          className={styles.mobileMenuButton}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={styles.hamburger}></span>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <Link href="/jobs" className={styles.mobileLink}>Jobs</Link>
          <Link href="/companies" className={styles.mobileLink}>Companies</Link>
          <Link href="/pricing" className={styles.mobileLink}>Pricing</Link>
          <div className={styles.mobileActions}>
            <Button variant="ghost" size="sm" fullWidth>Sign In</Button>
            <Button variant="primary" size="sm" fullWidth>Post a Job</Button>
          </div>
        </div>
      )}
    </header>
  );
};
