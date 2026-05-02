import { db } from "@/lib/db";
import { users, refreshTokens } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  signResetPasswordToken,
  verifyResetPasswordToken,
  signEmailVerificationToken
} from "@/lib/jwt/jwt.utils";

import type { UserRole } from "@/lib/jwt/jwt.types";

export const runtime = "nodejs";

// SHA-256 helpers
async function sha256(str: string): Promise<string> {
  const enc = new TextEncoder();
  const hash = await crypto.subtle.digest("SHA-256", enc.encode(str));
  return [...new Uint8Array(hash)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
async function verifyPassword(plain: string, hash: string) {
  return (await sha256(plain)) === hash;
}

export const authService = {

 async register({ email, password, name }: { email: string; password: string; name?: string }) {
  const existing = await db.query.users.findFirst({
    where: eq(users.email, email)
  });
  if (existing) throw new Error("User already exists");

  const passwordHash = await sha256(password);

  const inserted = await db.insert(users)
    .values({
  id: crypto.randomUUID(),
  email,
  name,
  passwordHash,
  role: "user"
})

    .returning();

  const user = inserted[0];

  // refresh token id
  const refreshId = crypto.randomUUID();

await db.insert(refreshTokens).values({
  id: crypto.randomUUID(),
  userId: user.id,
  tokenHash: await sha256(refreshId),
  expiresAt: new Date(Date.now() + 30 * 24 * 3600 * 1000),
  isRevoked: false
});


  return {
    user,
    accessToken: await signAccessToken({
      userId: user.id,
      email: user.email,
      role: (user.role as UserRole) ?? "user",
    }),
    refreshToken: await signRefreshToken({
      tokenId: refreshId,
      userId: user.id
    })
  };
},

async login({ email, password }: { email: string; password: string }) {
  const user = await db.query.users.findFirst({ where: eq(users.email, email) });

  if (!user || !user.passwordHash) throw new Error("Invalid credentials");

  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) throw new Error("Invalid credentials");

  const refreshId = crypto.randomUUID();

  await db.insert(refreshTokens).values({
    id: refreshId,
    userId: user.id,
    tokenHash: await sha256(refreshId),
    expiresAt: new Date(Date.now() + 30 * 24 * 3600 * 1000),
    isRevoked: false
  });

  return {
    user,
    accessToken: await signAccessToken({
      userId: user.id,
      email: user.email,
      role: (user.role as UserRole) ?? "user"
    }),
    refreshToken: await signRefreshToken({
      tokenId: refreshId,
      userId: user.id
    })
  };
},


  async resetPassword(token: string, newPassword: string) {
    const payload = await verifyResetPasswordToken(token);
    const hash = await sha256(newPassword);

    await db.update(users)
      .set({ passwordHash: hash })
      .where(eq(users.id, payload.userId));

    return { success: true };
  },

  async logout(refreshToken: string) {

  const payload = await verifyRefreshToken(refreshToken)

  await db
    .update(refreshTokens)
    .set({ isRevoked: true })

    .where(eq(refreshTokens.tokenHash, payload.tokenId))

  return { success: true }
}

};
