'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // مستقیم DOM update — بدون re-render
      if (progressRef.current) {
        const total =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;
        const percent = (window.scrollY / total) * 100;
        progressRef.current.style.width = `${percent}%`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* LOGO */}
        <Link href="/" className={styles.logo}>
          <div className={styles.logoMark}>E</div>
          <span>
            Euro<strong>Jobs</strong>
          </span>
        </Link>

        {/* NAV */}
        <nav className={styles.nav}>
          <Link
            href="/jobs"
            className={pathname === '/jobs' ? styles.activeLink : ''}
          >
            Find Jobs
          </Link>

          <Link
            href="/companies"
            className={pathname === '/companies' ? styles.activeLink : ''}
          >
            Companies
          </Link>

          <Link
            href="/about"
            className={pathname === '/about' ? styles.activeLink : ''}
          >
            About
          </Link>

          <Link
            href="/contact"
            className={pathname === '/contact' ? styles.activeLink : ''}
          >
            Contact
          </Link>
        </nav>

        {/* ACTIONS */}
        <div className={styles.actions}>
          <Link href="/signin" className={styles.signIn}>
            Sign In
          </Link>
          <Link href="/post-job" className={styles.postJob}>
            Post a Job
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button
          className={styles.mobileToggle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <Link href="/jobs">Find Jobs</Link>
          <Link href="/companies">Companies</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/signin">Sign In</Link>
          <Link href="/post-job" className={styles.mobilePostJob}>
            Post a Job
          </Link>
        </div>
      )}

      {/* SCROLL PROGRESS BAR */}
      <div ref={progressRef} className={styles.progressBar} />
    </header>
  );
}
