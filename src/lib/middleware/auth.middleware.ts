// src/lib/middleware/auth.middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken } from '@/lib/jwt/jwt.utils';
import { AuthError, AuthErrorCode } from '@/lib/types/auth.types';
import type { AccessTokenPayload } from '@/lib/types/token.types';

export type AuthenticatedRequest = NextRequest & {
  user: AccessTokenPayload;
};

type RouteHandler = (
  req: AuthenticatedRequest,
  context?: unknown
) => Promise<NextResponse>;

export function withAuth(handler: RouteHandler, requiredRole?: string) {
  return async (req: NextRequest, context?: unknown): Promise<NextResponse> => {
    try {
      const authHeader = req.headers.get('authorization');
      if (!authHeader?.startsWith('Bearer ')) {
        throw new AuthError(AuthErrorCode.UNAUTHORIZED, 'Missing authorization header', 401);
      }

      const token   = authHeader.slice(7);
      const payload = await verifyAccessToken(token);

      if (requiredRole && payload.role !== requiredRole) {
        throw new AuthError(AuthErrorCode.FORBIDDEN, 'Insufficient permissions', 403);
      }

      // ✅ inject user به request
      (req as AuthenticatedRequest).user = payload;
      return handler(req as AuthenticatedRequest, context);

    } catch (err) {
      if (err instanceof AuthError) {
        return NextResponse.json(
          { error: err.message, code: err.code },
          { status: err.statusCode }
        );
      }
      // jose errors
      if (err instanceof Error && err.message.includes('expired')) {
        return NextResponse.json(
          { error: 'Token expired', code: AuthErrorCode.TOKEN_EXPIRED },
          { status: 401 }
        );
      }
      return NextResponse.json(
        { error: 'Invalid token', code: AuthErrorCode.TOKEN_INVALID },
        { status: 401 }
      );
    }
  };
}
