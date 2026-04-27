import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    role: "admin" | "employer" | "jobseeker";
    name?: string;
    avatarUrl?: string | null;
  }

  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    role: "admin" | "employer" | "jobseeker";
    name?: string;
    avatarUrl?: string | null;
  }
}
