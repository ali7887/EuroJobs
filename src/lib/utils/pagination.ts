// src/lib/utils/pagination.ts

export interface PaginationParams {
  page?: number | string;
  limit?: number | string;
}

/**
 * نرمال‌سازی پارامترهای صفحه‌بندی از query string یا body
 */
export function parsePagination(
  params: PaginationParams
): { page: number; limit: number } {
  const rawPage = params.page ?? 1;
  const rawLimit = params.limit ?? 10;

  const page = Number(rawPage);
  const limit = Number(rawLimit);

  return {
    page: Number.isFinite(page) && page > 0 ? page : 1,
    limit:
      Number.isFinite(limit) && limit > 0 && limit <= 100
        ? limit
        : 10,
  };
}

/**
 * ساختار استاندارد پاسخ صفحه‌بندی‌شده
 */
export interface PaginatedResponse<T> {
  total: number;
  page: number;
  limit: number;
  data: T[];
}
