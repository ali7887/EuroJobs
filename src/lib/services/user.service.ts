import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// --------------------------------------------------------
// SHA-256 password hashing utilities
// --------------------------------------------------------
async function sha256(str: string): Promise<string> {
  const enc = new TextEncoder();
  const hash = await crypto.subtle.digest("SHA-256", enc.encode(str));
  return [...new Uint8Array(hash)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return (await sha256(plain)) === hash;
}

// --------------------------------------------------------
// Role normalization
// --------------------------------------------------------
type AppRole = "jobseeker" | "employer" | "admin";

function normalizeRole(role?: string | null): AppRole {
  if (!role) return "jobseeker";

  const map: Record<string, AppRole> = {
    jobseeker: "jobseeker",
    employer: "employer",
    admin: "admin",

    JOBSEEKER: "jobseeker",
    EMPLOYER: "employer",
    ADMIN: "admin",
  };

  return map[role] ?? "jobseeker";
}

// --------------------------------------------------------
// User service
// --------------------------------------------------------
export const userService = {
  async getById(id: string) {
    return db.query.users.findFirst({
      where: eq(users.id, id),
    });
  },

  async getByEmail(email: string) {
    return db.query.users.findFirst({
      where: eq(users.email, email),
    });
  },

  async updateProfile(userId: string, data: { name?: string }) {
    return db.update(users)
      .set({
        name: data.name,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();
  },

  async changePassword(userId: string, oldPass: string, newPass: string) {
    const user = await this.getById(userId);
    if (!user || !user.passwordHash) {
      throw new Error("User not found");
    }

    const valid = await verifyPassword(oldPass, user.passwordHash);
    if (!valid) {
      throw new Error("Invalid current password");
    }

    const newHash = await sha256(newPass);

    await db.update(users)
      .set({ passwordHash: newHash, updatedAt: new Date() })
      .where(eq(users.id, userId));

    return { success: true };
  },

  async list() {
    return db.select().from(users);
  },
};
