import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/lib/services/auth.service";
import { setRefreshTokenCookie } from "@/lib/auth/cookie.utilities";
import { authRateLimit } from "@/lib/security/rate-profiles";

export async function POST(req: NextRequest) {
  // ✅ Rate Limit FIRST
  authRateLimit(req);

  try {
    const body = await req.json();

    const result = await authService.login({
      email: body.email,
      password: body.password,
    });

    const res = NextResponse.json({
      user: result.user,
      tokens: {
accessToken: result.accessToken,
refreshToken: result.refreshToken,
      },
    });

    setRefreshTokenCookie(res, result.refreshToken)
;

    return res;
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 401 }
    );
  }
}
