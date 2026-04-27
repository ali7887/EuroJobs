import type { AuthOptions, SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// ----------------- helpers -----------------
async function verifyPassword(password: string, hashed: string) {
  const enc = new TextEncoder();
  const hashBuffer = await crypto.subtle.digest("SHA-256", enc.encode(password));
  const hex = [...new Uint8Array(hashBuffer)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hex === hashed;
}

// ----------------- auth options -----------------
export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const admin = await db.query.users.findFirst({
          where: eq(users.email, credentials.email),
        });

        if (!admin || admin.role !== "admin" || !admin.passwordHash)
          return null;

        const ok = await verifyPassword(credentials.password, admin.passwordHash);
        if (!ok) return null;

        return {
          id: admin.id,
          email: admin.email,
          role: admin.role,
        };
      },
    }),
  ],

  session: { strategy: "jwt" as SessionStrategy },

  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "admin" | "employer" | "jobseeker";
        session.user.email = token.email as string;
      }
      return session;
    },

    async signIn({ user, account }: { user: any; account?: any }) {
      if (account?.provider !== "credentials") return true;
      return user.role === "admin";
    },
  },

  pages: {
    signIn: "/admin/login",
  },
};
