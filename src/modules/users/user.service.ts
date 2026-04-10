import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import type { User, SafeUser } from '@/lib/db/schema';

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

function toSafeUser(user: User): SafeUser {
  const { passwordHash: _, ...safe } = user;
  return safe;
}

// ─────────────────────────────────────────────────────────────
// UserService (Drizzle-based)
// ─────────────────────────────────────────────────────────────

export const userService = {

  // ─── Find By Id ────────────────────────────────────────────
  async findById(id: number): Promise<SafeUser | null> {
    const rows = await db.select().from(users).where(eq(users.id, id));
    return rows[0] ? toSafeUser(rows[0]) : null;
  },

  // ─── Find By Email ─────────────────────────────────────────
  async findByEmail(email: string): Promise<User | null> {
    const rows = await db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase()));

    return rows[0] ?? null;
  },

  // ─── Compare Password ──────────────────────────────────────
  async comparePassword(plain: string, hash: string | null): Promise<boolean> {
    if (!hash) return false;
    return bcrypt.compare(plain, hash);
  },

  // ─── Create User ───────────────────────────────────────────
  async createUser(data: {
    email: string;
    password: string;
    name: string;
    
  }): Promise<SafeUser> {
    const email = data.email.toLowerCase();

    // چک تکراری نبودن ایمیل
    const exists = await this.findByEmail(email);
    if (exists) throw new Error('Email already in use');

    const now = new Date();

    const inserted = await db
      .insert(users)
      .values({
        email,
        passwordHash: await bcrypt.hash(data.password, 10),
        name: data.name,
        
        avatarUrl: null,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    return toSafeUser(inserted[0]);
  },

  // ─── Update User ───────────────────────────────────────────
  async updateUser(
    id: number,
    data: Partial<Pick<User, 'name' | 'avatarUrl'>>
  ): Promise<SafeUser | null> {
    const now = new Date();

    const updated = await db
      .update(users)
      .set({
        ...data,
        updatedAt: now, // اصلاح خطا
      })
      .where(eq(users.id, id))
      .returning();

    if (updated.length === 0) return null;

    return toSafeUser(updated[0]);
  },
};
