import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose'; // jose — Edge Runtime compatible

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

// مسیرهایی که نیاز به auth دارند
const PROTECTED_ROUTES: Record<string, string[]> = {
  '/api/applications': ['JOBSEEKER', 'EMPLOYER', 'ADMIN'],
  '/api/users':        ['ADMIN'],
};

// مسیرهایی که فقط برای role خاص محدود هستند (method-based)
const ROLE_RESTRICTED: Array<{
  path: string;
  method: string;
  roles: string[];
}> = [
  { path: '/api/jobs', method: 'POST',   roles: ['EMPLOYER', 'ADMIN'] },
  { path: '/api/jobs', method: 'PUT',    roles: ['EMPLOYER', 'ADMIN'] },
  { path: '/api/jobs', method: 'DELETE', roles: ['EMPLOYER', 'ADMIN'] },
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const method = req.method;

  // بررسی protected routes
  const protectedEntry = Object.entries(PROTECTED_ROUTES).find(([route]) =>
    pathname.startsWith(route)
  );

  // بررسی role-restricted routes
  const roleEntry = ROLE_RESTRICTED.find(
    (r) => pathname.startsWith(r.path) && r.method === method
  );

  if (!protectedEntry && !roleEntry) {
    return NextResponse.next(); // مسیر عمومی
  }

  // استخراج token
  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json(
      { error: 'Authorization header missing or malformed' },
      { status: 401 }
    );
  }

  const token = authHeader.slice(7);

  try {
    const { payload } = await jwtVerify(token, SECRET);
    const userRole = payload.role as string;

    // بررسی role برای protected routes
    if (protectedEntry) {
      const allowedRoles = protectedEntry[1];
      if (!allowedRoles.includes(userRole)) {
        return NextResponse.json(
          { error: 'Insufficient permissions' },
          { status: 403 }
        );
      }
    }

    // بررسی role برای method-restricted routes
    if (roleEntry && !roleEntry.roles.includes(userRole)) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    // اطلاعات user را به header اضافه می‌کنیم برای استفاده در route handlers
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-user-id', payload.userId as string);
    requestHeaders.set('x-user-role', userRole);

    return NextResponse.next({ request: { headers: requestHeaders } });
  } catch {
    return NextResponse.json(
      { error: 'Invalid or expired token' },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: ['/api/applications/:path*', '/api/users/:path*', '/api/jobs/:path*'],
};
