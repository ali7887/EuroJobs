import { type AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// ----------------- helpers -----------------

async function verifyPassword(password: string, hashed: string) {
  const enc = new TextEncoder();

  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    enc.encode(password)
  );

  const hex = [...new Uint8Array(hashBuffer)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return hex === hashed;
}

// ----------------- auth options -----------------

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),

    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!
    }),

    CredentialsProvider({
      name: "AdminLogin",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const admin = await db.query.users.findFirst({
          where: eq(users.email, credentials.email)
        });

        if (!admin) return null;
        if (admin.role !== "admin") return null;

        // حل خطای TypeScript که passwordHash ممکن است null باشد
        if (!admin.passwordHash) return null;

        const ok = await verifyPassword(
          credentials.password,
          admin.passwordHash
        );

        if (!ok) return null;

        return {
          id: admin.id,
          email: admin.email,
          role: admin.role
        };
      }

    })
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      if (user && (user as any).role) {
        token.role = (user as any).role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        // صریحاً به string تبدیل می‌کنیم تا TS غر نزند
        session.user.role = token.role as string;
      }
      return session;
    },

    async signIn({ account, user }) {
      if (!account) return false;

      // Social logins allowed for normal user
      if (account.provider !== "credentials") return true;

      // Credentials only for admin
      if ((user as any)?.role === "admin") return true;

      return false;
    }
  },

  pages: {
    signIn: "/admin/login"
  }
};
