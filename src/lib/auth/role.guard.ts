import { AuthUser } from "./auth.middleware";

export function ensureRole(userRole: string, allowed: string[]) {
  if (!allowed.includes(userRole)) {
    throw new Error("Forbidden");
  }
}

export const requireRole = ensureRole;


