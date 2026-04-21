import type { AuthContext } from "./auth.context";
import type { UserRole } from "../types/auth.types";

export function requireRole(ctx: AuthContext, roles: UserRole[]) {
  if (!roles.includes(ctx.role)) {
    throw new Error("FORBIDDEN");
  }
}
