import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { users, refreshTokens } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

import {
  verifyRefreshToken,
  signAccessToken,
  signRefreshToken,
} from "@/lib/jwt/jwt.utils";

import type { UserRole } from "@/lib/jwt/jwt.types";

export async function POST() {
  const cookieStore = await cookies();

  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // verify JWT 
    const payload = await verifyRefreshToken(refreshToken);

    // find refresh token record
    const storedToken = await db.query.refreshTokens.findFirst({
      where: eq(refreshTokens.token, payload.tokenId)
    });

    if (
      !storedToken ||
      storedToken.revoked ||
      storedToken.expiresAt < new Date()
    ) {
      throw new Error("Invalid refresh token");
    }

    // revoke old token
    await db
      .update(refreshTokens)
      .set({ revoked: true })
      .where(eq(refreshTokens.id, storedToken.id));

    // fetch user
    const user = await db.query.users.findFirst({
      where: eq(users.id, payload.userId),
    });

    if (!user) throw new Error("User not found");

    // generate new tokens
    const newAccessToken = await signAccessToken({
      userId: user.id,
      email: user.email,
      role: (user.role as UserRole) ?? "user",
    });

    const newTokenId = crypto.randomUUID();

    const newRefreshToken = await signRefreshToken({
      tokenId: newTokenId,
      userId: user.id,
    });

    // store refresh token in DB
    await db.insert(refreshTokens).values({
      userId: user.id,
      token: newTokenId,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      revoked: false
    });

    // set cookies
    cookieStore.set("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    cookieStore.set("refresh_token", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    cookieStore.set("accessToken", "", { path: "/" });
    cookieStore.set("refresh_token", "", { path: "/" });

    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
