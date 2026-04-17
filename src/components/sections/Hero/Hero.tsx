"use client";

import React, { useRef, useEffect, useState } from "react";
import styles from "./Hero.module.css";
import { Search, Mouse } from "lucide-react";

export default function Hero() {
  const [titleValue, setTitleValue] = useState("");
  const [locationValue, setLocationValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");

  const heroRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  // Spotlight Animation
  useEffect(() => {
    const hero = heroRef.current;
    const light = spotlightRef.current;
    if (!hero || !light) return;

    const move = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      light.style.transform = `translate(${x - 150}px, ${y - 150}px)`;
    };

    hero.addEventListener("mousemove", move);
    return () => hero.removeEventListener("mousemove", move);
  }, []);

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

      {/* Spotlight */}
      <div ref={spotlightRef} className={styles.spotlight}></div>

      {/* Primary Hero */}
      <div className={styles.primary}>

        {/* Badge */}
        <div className={styles.badge}>Europe’s #1 Tech Job Board</div>

        {/* Headline */}
        <h1 className={styles.headline}>
          Find Your Next <span className={styles.gradient}>Tech Job</span> in Europe
        </h1>

        {/* Subtext */}
        <p className={styles.subtext}>
          Discover high‑growth tech opportunities from Europe’s fastest‑growing startups
          and global engineering teams.
        </p>

        {/* Search Bar */}
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

        {/* Tags */}
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

        {/* CTA */}
        <button className={styles.primaryCTA}>
          Browse All Jobs →
        </button>

        {/* Scroll Indicator */}
        <div className={styles.scroll}>
          <Mouse size={18} />
          <span>Scroll</span>
        </div>
      </div>

      {/* Secondary Section */}
      <div className={styles.secondary}>

        {/* Stats */}
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

        {/* Trusted By */}
        <div className={styles.logos}>
          <img src="/logos/google.svg" alt="google" />
          <img src="/logos/microsoft.svg" alt="microsoft" />
          <img src="/logos/stripe.svg" alt="stripe" />
          <img src="/logos/spotify.svg" alt="spotify" />
          <img src="/logos/amazon.svg" alt="amazon" />
        </div>
      </div>
    </section>
  );
}
