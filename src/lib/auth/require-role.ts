import { AuthContext } from "./auth.context";
import { UserRole } from "@/lib/jwt/jwt.types"; 

export function requireRole(ctx: AuthContext, allowed: string[]) {
  if (!allowed.includes(ctx.role)) {
    throw Object.assign(new Error("Forbidden"), { status: 403 });
  }
}
