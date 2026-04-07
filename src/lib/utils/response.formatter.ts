// src/lib/utils/response.formatter.ts

import { NextResponse } from 'next/server';
import type { PaginatedResponse } from './pagination';

/**
 * پاسخ موفق ساده
 */
export function successResponse<T>(
  data: T,
  status: number = 200
): NextResponse {
  return NextResponse.json(data, { status });
}

/**
 * پاسخ موفق با صفحه‌بندی
 */
export function paginatedResponse<T>(
  payload: PaginatedResponse<T>,
  status: number = 200
): NextResponse {
  return NextResponse.json(payload, { status });
}

/**
 * پاسخ خطا (در صورت نیاز خارج از apiErrorHandler)
 */
export function errorResponse(
  message: string,
  status: number = 500,
  code?: string
): NextResponse {
  return NextResponse.json(
    { error: message, ...(code ? { code } : {}) },
    { status }
  );
}
