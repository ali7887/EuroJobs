import { verifyAccessToken } from "@/lib/jwt/jwt.utils";
import type { AccessTokenPayload } from "@/lib/jwt/jwt.types";
import type { UserRole } from "../types/auth.types"; // یا مسیری که فایل را در آن ساخته‌ای

export type AuthContext = {
  userId: number;
  role: UserRole;
};

/**
 * تبدیل توکن خام به Context استاندارد پروژه
 * این تابع پل ارتباطی بین JWT و منطق بیزینسی ماست.
 */
export async function getAuthContext(token: string): Promise<AuthContext> {
  // تایید امضای توکن و استخراج اطلاعات
  const payload = (await verifyAccessToken(token)) as AccessTokenPayload;

  // بازگرداندن مقادیر واقعی (Values) و نه تایپ‌ها
  return {
    userId: Number(payload.userId), // تبدیل رشته به عدد برای مطابقت با schema دیتابیس
    role: payload.role as UserRole, // Type Casting برای اطمینان از صحت نقش کاربری
  };
}
