export interface AuthContext {
  userId: string;
  email: string;
  role: string; // "user" | "employer" | "admin" | ...
}

import { User } from "lucide-react";
import { NextRequest } from "next/server";

export function getAuthUser(req: NextRequest): AuthContext {
  const userId = req.headers.get("x-user-id");
  const email = req.headers.get("x-user-email");
  const role = req.headers.get("x-user-role");

  if (!userId || !role) {
    throw new Error("Unauthorized");
  }

  return {
    userId: userId,
    email: email ?? "",
    role,
  };
}
