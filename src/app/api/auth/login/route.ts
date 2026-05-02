import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, refreshTokens } from "@/lib/db/schema";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { eq } from "drizzle-orm";

const ACCESS_TOKEN_EXPIRE = "30m";
const REFRESH_EXPIRE_MS = 1000 * 60 * 60 * 24 * 7;
console.log("ENV CHECK:", process.env.DATABASE_URL);

const ACCESS_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "dev-secret-access-1234567890"
);

export async function POST(req: Request) {
  try {
    console.log("LOGIN ROUTE (FINAL) HIT");
    console.log("ENV CHECK:", process.env.DATABASE_URL);

    const body = await req.json();
    const { email, password } = body || {};

    if (!email || !password) {
      return NextResponse.json(
        { error: "Username or Password is wrong" },
        { status: 400 }
      );
    }

    // Find user
    const [user] = await db.select().from(users).where(eq(users.email, email));

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { error: " Username or Password is wrong" },
        { status: 401 }
      );
    }

    // Generate Access Token
    const accessToken = await new SignJWT({
      userId: user.id,
      role: user.role,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(ACCESS_TOKEN_EXPIRE)
      .sign(ACCESS_SECRET);

    // Generate Refresh Token
    const refreshToken = crypto.randomUUID();
    const tokenHash = await bcrypt.hash(refreshToken, 10);

    await db.insert(refreshTokens).values({
      id: crypto.randomUUID(),
      userId: user.id,
      tokenHash,
      isRevoked: false,
      expiresAt: new Date(Date.now() + REFRESH_EXPIRE_MS),
    });

    // Build Response
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });

    // Attach Cookies
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 30, // 30 minutes
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
