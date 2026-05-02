import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, refreshTokens } from "@/lib/db/schema";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);
const JWT_ACCESS_EXP = "30m";
const JWT_REFRESH_EXP_MS = 1000 * 60 * 60 * 24 * 7;

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password)
      return NextResponse.json(
        { error: "ایمیل یا رمز عبور وارد نشده است" },
        { status: 400 }
      );

    const [user] = await db.select().from(users).where(eq(users.email, email));
    if (!user)
      return NextResponse.json({ error: "کاربر یافت نشد" }, { status: 404 });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match)
      return NextResponse.json({ error: "رمز عبور نادرست است" }, { status: 401 });

    // Access Token
    const accessToken = await new SignJWT({
      userId: user.id,
      role: user.role,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(JWT_ACCESS_EXP)
      .sign(JWT_SECRET);

    // Refresh Token
    const refreshToken = crypto.randomUUID();
    const tokenHash = await bcrypt.hash(refreshToken, 10);

    await db.insert(refreshTokens).values({
      id: crypto.randomUUID(),
      userId: user.id,
      tokenHash: tokenHash,
      expiresAt: new Date(Date.now() + JWT_REFRESH_EXP_MS),
      isRevoked: false,
    });

    const res = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    res.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 30,
    });

    res.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "خطا در فرایند ورود" },
      { status: 500 }
    );
  }
}
