// src/lib/utils/error.handler.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AuthError } from '@/lib/types/auth.types'; // این فایل را در پروژه‌ات داریم

// خطای عمومی برای API
export class ApiError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly statusCode: number = 500
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Wrapper جنرال برای try/catch در route handlers
 *
 * مثال استفاده:
 * export const GET = (req: NextRequest) =>
 *   apiErrorHandler(req, async () => {
 *     // logic...
 *     return NextResponse.json(...)
 *   });
 */
export async function apiErrorHandler(
  _req: NextRequest,
  handler: () => Promise<NextResponse>
): Promise<NextResponse> {
  try {
    return await handler();
  } catch (error: any) {
    console.error('API Error:', error);

    // AuthError → مستقیم پاس می‌دهیم
    if (error instanceof AuthError) {
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: error.statusCode ?? 401 }
      );
    }

    // ApiError → مستقیم پاس می‌دهیم
    if (error instanceof ApiError) {
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: error.statusCode }
      );
    }

    // خطای ناشناخته
    const generic = new ApiError(
      'INTERNAL_SERVER_ERROR',
      'An unexpected error occurred',
      error?.statusCode ?? 500
    );

    return NextResponse.json(
      { error: generic.message, code: generic.code },
      { status: generic.statusCode }
    );
  }
}
