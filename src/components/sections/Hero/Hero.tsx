"use client";

import React, { useRef, useEffect, useState } from "react";
import styles from "./Hero.module.css";
import { Search, Mouse } from "lucide-react";

export default function Hero() {
  const [titleValue, setTitleValue] = useState("");
  const [locationValue, setLocationValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");

  const heroRef = useRef<HTMLDivElement>(null);

  // Tag click handlers
  const handleTag = (tag: string) => {
    if (tag === "Berlin") setLocationValue("Berlin");
    else if (tag === "Remote") setLocationValue("Remote");
    else if (["React", "Next.js"].includes(tag)) setTitleValue(tag);
    else setCategoryValue(tag);
  };

  // Stats counter
  useEffect(() => {
    const elements = document.querySelectorAll("[data-counter]") as NodeListOf<HTMLElement>;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el = entry.target as HTMLElement;
        const target = Number(el.dataset.target);
        let value = 0;
        const step = target / (1500 / 16);

        const tick = () => {
          value += step;
          if (value >= target) {
            el.innerText = target.toString();
          } else {
            el.innerText = Math.floor(value).toString();
            requestAnimationFrame(tick);
          }
        };

        tick();
        observer.unobserve(el);
      });
    }, { threshold: 0.4 });

    elements.forEach(el => observer.observe(el));
  }, []);

  return (
    <section ref={heroRef} className={styles.hero}>

      {/* Primary Hero */}
      <div className={styles.primary}>

        <div className={styles.badge}>Europe’s #1 Tech Job Board</div>

        <h1 className={styles.headline}>
          Find Your Next <span className={styles.gradient}>Tech Job</span> in Europe
        </h1>

        <p className={styles.subtext}>
          Discover high‑growth tech opportunities from Europe’s fastest‑growing startups
          and global engineering teams.
        </p>

        <div className={styles.searchBar}>

          <div className={styles.field}>
            <label>Job Title</label>
            <input
              value={titleValue}
              onChange={e => setTitleValue(e.target.value)}
              placeholder="Frontend Developer, React..."
            />
          </div>

          <div className={styles.field}>
            <label>Location</label>
            <input
              value={locationValue}
              onChange={e => setLocationValue(e.target.value)}
              placeholder="Berlin, Remote..."
            />
          </div>

          <div className={styles.field}>
            <label>Category</label>
            <input
              value={categoryValue}
              onChange={e => setCategoryValue(e.target.value)}
              placeholder="Engineering, Product..."
            />
          </div>

          <button className={styles.searchButton}>
            Search <Search size={17} />
          </button>
        </div>

        <div className={styles.tags}>
          {["React", "Next.js", "Remote", "Berlin", "Senior"].map(tag => (
            <button
              key={tag}
              onClick={() => handleTag(tag)}
              className={styles.tag}
            >
              {tag}
            </button>
          ))}
        </div>

        <button className={styles.primaryCTA}>
          Browse All Jobs →
        </button>

        <div className={styles.scroll}>
          <Mouse size={18} />
          <span>Scroll</span>
        </div>
      </div>

      <div className={styles.secondary}>

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

        <div className={styles.logos}>
          <img src="/logos/google.svg" alt="google" />
          <img src="/logos/microsoft.svg" alt="microsoft" />

          <img src="/logos/amazon.svg" alt="amazon" />

          {/* Germany */}
          <img src="/logos/bmw.svg" alt="BMW" />
          <img src="/logos/benz.svg" alt="Benz" />
          <img src="/logos/deutschebank.svg" alt="Deutsche Bank" />
          <img src="/logos/allianz.svg" alt="Allianz" />
          <img src="/logos/sap.svg" alt="SAP" />
          <img src="/logos/siemens.svg" alt="Siemens" />
          <img src="/logos/deutschtelekom.svg" alt="Deutsche Telekom" />
        </div>

      </div>
    </section>
  );
}
