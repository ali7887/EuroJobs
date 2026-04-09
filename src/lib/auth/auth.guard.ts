import { extractAccessToken } from "./token.extractor";
import { getAuthContext } from "./auth.context";

export async function requireAuth() {

  const token = await extractAccessToken();

  if (!token) {
    throw new Error("UNAUTHORIZED");
  }

  const ctx = await getAuthContext(token);

  return ctx;
}
