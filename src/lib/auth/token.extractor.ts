import { cookies, headers } from "next/headers";

export async function extractAccessToken(): Promise<string | null> {

  const cookieStore = cookies();
  const tokenFromCookie = (await cookieStore).get("accessToken");

  if (tokenFromCookie) {
    return tokenFromCookie.value;
  }

  const authHeader = (await headers()).get("authorization");

  if (!authHeader) return null;

  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer") return null;

  return token;
}
