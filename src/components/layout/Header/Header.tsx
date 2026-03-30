'use client';

import Link from 'next/link';
import { Briefcase, Menu, X } from 'lucide-react';
import { useState } from 'react';
import styles from './Header.module.css';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Briefcase size={24} />
          <span>EuroJobs</span>
        </Link>

        <nav className={styles.nav}>
          <Link href="/jobs">Find Jobs</Link>
          <Link href="/companies">Companies</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <div className={styles.actions}>
          <Link href="/signin" className={styles.signIn}>Sign In</Link>
          <Link href="/post-job" className={styles.postJob}>Post a Job</Link>
        </div>

        <button 
          className={styles.mobileToggle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <Link href="/jobs">Find Jobs</Link>
          <Link href="/companies">Companies</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/signin">Sign In</Link>
          <Link href="/post-job" className={styles.mobilePostJob}>Post a Job</Link>
        </div>
      )}
    </header>
  );
}
