// src/lib/auth/auth.ts
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const secretString = process.env.JWT_SECRET;
if (!secretString) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

const JWT_SECRET = new TextEncoder().encode(secretString);

export async function auth() {
  const cookieStore = await cookies(); 
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) return null;

  try {
    const { payload } = await jwtVerify(accessToken, JWT_SECRET);

    // تایپ گارد برای اطمینان از ساختار پPayload
    if (
      typeof payload.userId !== "string" ||
      typeof payload.role !== "string"
    ) {
      return null;
    }

    return {
      userId: payload.userId,
      role: payload.role,
    };
  } catch (error) {
    // در صورت انقضا یا نامعتبر بودن توکن
    return null;
  }
}
