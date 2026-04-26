"use client";

import { useRouter, useSearchParams } from "next/navigation";
import styles from "./pagination.module.css";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export default function Pagination({ totalPages, currentPage }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const createUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    return `/jobs?${params.toString()}`;
  };

  const goToPage = (page: number) => {
    router.push(createUrl(page));
  };

  const pagesToShow = getPageNumbers(currentPage, totalPages);

  return (
    <div className={styles.pagination}>
      <button
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
      >
        Prev
      </button>

      {pagesToShow.map((p, idx) =>
        p === "..." ? (
          <span key={idx} className={styles.dots}>…</span>
        ) : (
          <button
            key={idx}
            onClick={() => goToPage(Number(p))}
            className={p === currentPage ? styles.active : ""}
          >
            {p}
          </button>
        )
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() => goToPage(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}

function getPageNumbers(current: number, total: number): (number | "...")[] {
  const delta = 2;
  const left = Math.max(1, current - delta);
  const right = Math.min(total, current + delta);

  const pages: (number | "...")[] = [];

  if (left > 1) {
    pages.push(1);
    if (left > 2) pages.push("...");
  }

  for (let i = left; i <= right; i++) {
    pages.push(i);
  }

  if (right < total) {
    if (right < total - 1) pages.push("...");
    pages.push(total);
  }

  return pages;
}
