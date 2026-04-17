"use client";

import React, { useRef, useEffect, useState } from "react";
import styles from "./Hero.module.css";
import { Search, Mouse } from "lucide-react";

export default function Hero() {
  const [titleValue, setTitleValue] = useState("");
  const [locationValue, setLocationValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");

  const heroRef = useRef<HTMLDivElement>(null);

  // Tag click logic
  const handleTag = (tag: string) => {
    if (tag === "Berlin") setLocationValue("Berlin");
    else if (tag === "Remote") setLocationValue("Remote");
    else if (["React", "Next.js"].includes(tag)) setTitleValue(tag);
    else setCategoryValue(tag);
  };

  // Scroll to features
  const handleScroll = () => {
    const next = document.getElementById("features-section");
    if (next) next.scrollIntoView({ behavior: "smooth" });
  };

  // Stats counter with easing
  // Stats counter with easing
  useEffect(() => {
    const elements = document.querySelectorAll("[data-counter]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target as HTMLElement; // ← FIX: type cast

          const targetValue = Number(el.dataset.target); // ← now safe
          const duration = 1500;
          const startTime = performance.now();

          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);

            const value = Math.floor(eased * targetValue);
            el.textContent = value.toString();

            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
          observer.unobserve(el);
        });
      },
      { threshold: 0.4 }
    );

    elements.forEach((el) => observer.observe(el));
  }, []);


  return (
    <section ref={heroRef} className={styles.hero}>
      {/* Primary */}
      <div className={styles.primary}>


        <h1 className={styles.headline}>
          Find Your Next <span className={styles.gradient}>Tech Job</span> in Europe
        </h1>

        <p className={styles.subtext}>
          Discover high‑growth tech opportunities from Europe’s fastest‑growing
          startups and global engineering teams.
        </p>

        {/* Search Bar */}
        <div className={styles.searchBar}>

          <div className={styles.field}>
            <label>Job Title</label>
            <input
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
              placeholder="Frontend Developer, React..."
              aria-label="search by job title"
            />
          </div>

          <div className={styles.field}>
            <label>Location</label>
            <input
              value={locationValue}
              onChange={(e) => setLocationValue(e.target.value)}
              placeholder="Berlin, Remote..."
              aria-label="search by location"
            />
          </div>

          <div className={styles.field}>
            <label>Category</label>
            <select
              value={categoryValue}
              onChange={(e) => setCategoryValue(e.target.value)}
              aria-label="search by category"
            >
              <option value="">All</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="fullstack">Fullstack</option>
              <option value="mobile">Mobile</option>
              <option value="devops">DevOps</option>
            </select>
          </div>

          <button className={styles.searchButton}>
            Search <Search size={17} />
          </button>
        </div>

        <div className={styles.tags}>
          {["React", "Next.js", "Remote", "Berlin", "Senior"].map((tag) => (
            <button key={tag} onClick={() => handleTag(tag)} className={styles.tag}>
              {tag}
            </button>
          ))}
        </div>

        <button className={styles.primaryCTA}>Browse All Jobs →</button>


      </div>

      {/* Secondary */}
      <div className={styles.secondary}>

        <div className={styles.logos}>
          <img src="/logos/google.svg" alt="Google" />
          <img src="/logos/microsoft.svg" alt="Microsoft" />
          <img src="/logos/amazon.svg" alt="Amazon" />
          <img src="/logos/bmw.svg" alt="BMW" />
          <img src="/logos/benz.svg" alt="Benz" />
          <img src="/logos/deutschebank.svg" alt="Deutsche Bank" />
          <img src="/logos/allianz.svg" alt="Allianz" />
          <img src="/logos/sap.svg" alt="SAP" />
          <img src="/logos/siemens.svg" alt="Siemens" />
          <img src="/logos/deutschtelekom.svg" alt="Deutsche Telekom" />
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span data-counter data-target="12450"></span>
            <p>Verified Tech Jobs</p>
          </div>

          <div className={styles.stat}>
            <span data-counter data-target="850"></span>
            <p>Active Companies</p>
          </div>

          <div className={styles.stat}>
            <span data-counter data-target="98"></span>
            <p>Match Accuracy (%)</p>
          </div>

          <div className={styles.stat}>
            <span data-counter data-target="24"></span>
            <p>Avg Approval Time (h)</p>
          </div>
        </div>


      </div>
    </section>
  );
}
