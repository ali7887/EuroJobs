"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useState } from "react";

export default function JobSearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialSearch = searchParams.get("search") || "";

  const [value, setValue] = useState(initialSearch);

  // Debounce function
  const debounce = (fn: Function, delay: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), delay);
    };
  };

  const updateURL = useCallback(
    debounce((searchValue: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (searchValue) params.set("search", searchValue);
      else params.delete("search");

      // IMPORTANT: Reset pagination whenever search changes
      params.delete("page");

      const url = `${pathname}?${params.toString()}`;
      router.push(url);
    }, 400),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    updateURL(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search jobs..."
      value={value}
      onChange={handleChange}
      className="search-input"
    />
  );
}
