import type { AuthContext } from "./auth.context";

export function requireRole(
  ctx: AuthContext,
  roles: string[]
) {

  if (!roles.includes(ctx.role)) {
    throw new Error("FORBIDDEN");
  }

}
