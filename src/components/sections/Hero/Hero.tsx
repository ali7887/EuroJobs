"use client";

import React, { useRef, useEffect } from "react";
import styles from "./Hero.module.css";
import { Search, MapPin, Briefcase, Mouse } from "lucide-react";

export default function Hero() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Correct + Safe Type
  const countersRef = useRef<NodeListOf<HTMLElement> | null>(null);

  /* ---------------------------------------------------
     🌟 Spotlight Mouse Interaction
  --------------------------------------------------- */
  useEffect(() => {
    const hero = heroRef.current;
    const spotlight = spotlightRef.current;
    if (!hero || !spotlight) return;

    const move = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spotlight.style.transform = `translate(${x - 150}px, ${y - 150}px)`;
    };

    const enter = () => (spotlight.style.opacity = "1");
    const leave = () => (spotlight.style.opacity = "0");

    hero.addEventListener("mousemove", move, { passive: true });
    hero.addEventListener("mouseenter", enter, { passive: true });
    hero.addEventListener("mouseleave", leave, { passive: true });

    return () => {
      hero.removeEventListener("mousemove", move);
      hero.removeEventListener("mouseenter", enter);
      hero.removeEventListener("mouseleave", leave);
    };
  }, []);

  /* ---------------------------------------------------
     🔢 Counter Animation (Intersection + RAF)
  --------------------------------------------------- */
  useEffect(() => {
    const counters = document.querySelectorAll("[data-counter]") as NodeListOf<HTMLElement>;
    countersRef.current = counters;

    const animateCounter = (el: HTMLElement) => {
      const target = Number(el.dataset.target);
      let value = 0;
      const duration = 1500;
      const step = target / (duration / 16);

      const tick = () => {
        value += step;
        if (value >= target) {
          el.innerText = formatNum(target);
        } else {
          el.innerText = formatNum(Math.floor(value));
          requestAnimationFrame(tick);
        }
      };

      tick();
    };

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target as HTMLElement);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    counters.forEach(counter => observer.observe(counter));
  }, []);

  /* ---------------------------------------------------
     💎 Component Layout
  --------------------------------------------------- */
  return (
    <section ref={heroRef} className={styles.hero}>
      {/* Spotlight */}
      <div ref={spotlightRef} className={styles.spotlight}></div>

      {/* Background Orbs */}
      <div className={styles.orb1}></div>
      <div className={styles.orb2}></div>
      <div className={styles.orb3}></div>

      {/* Grid + Noise */}
      <div className={styles.gridOverlay}></div>
      <div className={styles.noise}></div>

      <div className={styles.inner}>
        {/* Badge */}
        <div className={styles.badge}>🇪🇺 #1 Tech Job Board in Europe</div>

        {/* Title */}
        <h1 className={styles.title}>
          Find Your Next <span className={styles.gradientText}>Europe</span> Tech Job
        </h1>

        {/* Subtitle */}
        <p className={styles.subtitle}>
          Discover high‑growth tech opportunities from Europe’s leading startups and enterprises.
        </p>

        {/* Search Bar */}
        <div className={styles.searchBar}>
          <div className={styles.field}>
            <label>Job Title</label>
            <input placeholder="Senior Frontend Developer" />
          </div>

          <div className={styles.field}>
            <label>Location</label>
            <input placeholder="Berlin, Remote, Europe…" />
          </div>

          <div className={styles.field}>
            <label>Category</label>
            <input placeholder="Engineering, Product…" />
          </div>

          <button className={styles.searchButton}>
            Search Jobs <Search size={18} />
          </button>
        </div>

        {/* Tags */}
        <div className={styles.tags}>
          {["React", "Next.js", "Remote", "Berlin", "Senior"].map(tag => (
            <button key={tag} className={styles.tagBtn}>
              {tag}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className={styles.stats}>
          <div className={styles.statCard}>
            <Briefcase size={26} />
            <span data-counter data-target="12450">0</span>
            <p>Verified Tech Jobs</p>
          </div>

          <div className={styles.statCard}>
            <MapPin size={26} />
            <span data-counter data-target="850">0</span>
            <p>Active Companies</p>
          </div>

          <div className={styles.statCard}>
            <Briefcase size={26} />
            <span data-counter data-target="98">0</span>
            <p>Match Accuracy</p>
          </div>

          <div className={styles.statCard}>
            <Briefcase size={26} />
            <span data-counter data-target="24">0</span>
            <p>Avg Job Approval</p>
          </div>
        </div>

        {/* Logos */}
        <div className={styles.logos}>
          <img src="/logos/google.svg" alt="google" />
          <img src="/logos/microsoft.svg" alt="microsoft" />
          <img src="/logos/stripe.svg" alt="stripe" />
          <img src="/logos/spotify.svg" alt="spotify" />
          <img src="/logos/amazon.svg" alt="amazon" />
        </div>

        {/* Scroll Indicator */}
        <div className={styles.scroll}>
          <Mouse size={20} />
          <span>SCROLL</span>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------
   🔧 Number Formatter (1,000+)
--------------------------------------------------- */
function formatNum(n: number) {
  return n >= 1000 ? n.toLocaleString() + "+" : n + "+";
}
