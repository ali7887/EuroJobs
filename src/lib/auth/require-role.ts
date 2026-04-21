import { UserRole } from "../types/auth.types";
import { AuthContext } from "./auth.context";

export function requireRole(ctx: AuthContext, roles: UserRole[]) {

  if (!roles.includes(ctx.role)) {
    throw new Error("Forbidden");
  }

}
