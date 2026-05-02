// src/app/api/auth/refresh/route.ts

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { refreshTokens } from "@/lib/db/schema/refresh_tokens";
import { eq } from "drizzle-orm";
import { SignJWT } from "jose";
import bcrypt from "bcryptjs";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { error: "Missing refresh token" },
      { status: 401 }
    );
  }

  // دریافت همه refresh token ها
  const allTokens = await db.select().from(refreshTokens);

  const tokenRow = allTokens.find(
    (t) => bcrypt.compareSync(refreshToken, t.tokenHash) && !t.isRevoked
  );

  if (!tokenRow) {
    return NextResponse.json(
      { error: "Invalid refresh token" },
      { status: 401 }
    );
  }

  // ✅ ساخت access token جدید به روش صحیح
  const newAccessToken = await new SignJWT({
    userId: tokenRow.userId,
    role: "user", // یا role واقعی اگر داری
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30m")
    .sign(JWT_SECRET);

  const response = NextResponse.json({ success: true });

  response.cookies.set("accessToken", newAccessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 30, // 30 دقیقه
  });

  return response;
}
