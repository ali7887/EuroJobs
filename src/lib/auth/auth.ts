import { cookies } from "next/headers";
import { verifyAccessToken } from "@/lib/jwt/jwt.utils";

export async function auth() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) return null;

  try {
    const payload = await verifyAccessToken(accessToken);

    return {
      userId: Number(payload.userId),
      role: payload.role
    };
  } catch {
    return null;
  }
}
