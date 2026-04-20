import { extractAccessToken } from "./token.extractor";
import { getAuthContext } from "./auth.context";
import { NextRequest } from "next/server";

export async function requireAuth(req: NextRequest) {

  const token = await extractAccessToken();

  if (!token) {
    throw new Error("UNAUTHORIZED");
  }

  const ctx = await getAuthContext(token);

  return ctx;
}
