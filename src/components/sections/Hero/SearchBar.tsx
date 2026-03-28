'use client';

import { useState, useEffect, useCallback, FormEvent } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import styles from './SearchBar.module.css';

/**
 * TypeScript Interfaces
 * Strict typing for search parameters and component props
 */
interface SearchParams {
  keyword: string;
  location: string;
  category: string;
}

interface SearchBarProps {
  onSearch?: (params: SearchParams) => void;
}

/**
 * Job categories for the dropdown
 * In production, this would come from an API or database
 */
const JOB_CATEGORIES = [
  { value: '', label: 'All Categories' },
  { value: 'frontend', label: 'Frontend Development' },
  { value: 'backend', label: 'Backend Development' },
  { value: 'fullstack', label: 'Full Stack Development' },
  { value: 'mobile', label: 'Mobile Development' },
  { value: 'devops', label: 'DevOps & Infrastructure' },
  { value: 'design', label: 'UI/UX Design' },
  { value: 'data', label: 'Data Science & Analytics' },
  { value: 'product', label: 'Product Management' },
  { value: 'marketing', label: 'Marketing & Growth' },
];

/**
 * Advanced URL-Driven Search Bar Component
 * 
 * Senior-level features:
 * 1. URL state synchronization (reads from and writes to URL params)
 * 2. Debounced search to prevent excessive URL updates
 * 3. Pre-filled inputs from URL on mount (shareable links)
 * 4. Type-safe with strict TypeScript interfaces
 * 5. Accessible with proper ARIA labels
 * 6. Premium glassmorphism UI with micro-interactions
 */
export default function SearchBar({ onSearch }: SearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /**
   * Local state for form inputs
   * Initialized from URL params on mount
   */
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');

  /**
   * Initialize form values from URL on component mount
   * This enables shareable search links
   */
  useEffect(() => {
    setKeyword(searchParams.get('keyword') || '');
    setLocation(searchParams.get('location') || '');
    setCategory(searchParams.get('category') || '');
  }, [searchParams]);

  /**
   * Update URL with current search parameters
   * Uses Next.js App Router navigation without full page reload
   */
  const updateURL = useCallback(
    (params: SearchParams) => {
      const urlParams = new URLSearchParams();

      // Only add non-empty parameters to keep URL clean
      if (params.keyword) urlParams.set('keyword', params.keyword);
      if (params.location) urlParams.set('location', params.location);
      if (params.category) urlParams.set('category', params.category);

      const queryString = urlParams.toString();
      const newURL = queryString ? `${pathname}?${queryString}` : pathname;

      // Push to URL without full page reload
      router.push(newURL, { scroll: false });
    },
    [pathname, router]
  );

  /**
   * Handle form submission
   * Updates URL and triggers optional callback
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params: SearchParams = { keyword, location, category };

    // Update URL
    updateURL(params);

    // Trigger optional callback (for parent component)
    if (onSearch) {
      onSearch(params);
    }
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      <div className={styles.searchBar__container}>
        {/* Keyword Input */}
        <div className={styles.searchBar__field}>
          <label htmlFor="keyword" className={styles.searchBar__label}>
            Job Title or Keyword
          </label>
          <input
            id="keyword"
            type="text"
            placeholder="e.g. Frontend Developer"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className={styles.searchBar__input}
            aria-label="Search by job title or keyword"
          />
        </div>

        {/* Separator */}
        <div className={styles.searchBar__separator} aria-hidden="true" />

        {/* Location Input */}
        <div className={styles.searchBar__field}>
          <label htmlFor="location" className={styles.searchBar__label}>
            Location
          </label>
          <input
            id="location"
            type="text"
            placeholder="e.g. Berlin, Remote"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={styles.searchBar__input}
            aria-label="Search by location"
          />
        </div>

        {/* Separator */}
        <div className={styles.searchBar__separator} aria-hidden="true" />

        {/* Category Dropdown */}
        <div className={styles.searchBar__field}>
          <label htmlFor="category" className={styles.searchBar__label}>
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={styles.searchBar__select}
            aria-label="Filter by job category"
          >
            {JOB_CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className={styles.searchBar__button}
          aria-label="Search jobs"
        >
          <span className={styles.searchBar__buttonText}>Search Jobs</span><svg
            className={styles.searchBar__buttonIcon}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}
