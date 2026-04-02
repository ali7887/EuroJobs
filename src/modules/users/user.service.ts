// src/modules/users/user.service.ts
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db/db';

// ─── Type ───────────────────────────────────────────────────────────────────
export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'JOBSEEKER' | 'EMPLOYER' | 'ADMIN';
  createdAt: string;
  updatedAt: string;
};

export type SafeUser = Omit<User, 'password'>;

// ─── Helper ──────────────────────────────────────────────────────────────────
function toSafeUser(user: User): SafeUser {
  const { password: _, ...safe } = user;
  return safe;
}

// ─── Standalone exports (backward compatibility) ──────────────────────────
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// ─── userService object ───────────────────────────────────────────────────
export const userService = {

  async verifyCredentials(email: string, password: string): Promise<SafeUser | null> {
    // کاربر رو از DB پیدا می‌کنیم
    const user = db.data.users.find((u: User) => u.email === email) ?? null;
    if (!user) return null;

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return null;

    return toSafeUser(user);
  },

  async createUser(data: {
    email: string;
    password: string;
    name: string;
    role?: 'JOBSEEKER' | 'EMPLOYER';
  }): Promise<SafeUser> {
    const existing = db.data.users.find((u: User) => u.email === data.email);
    if (existing) throw new Error('Email already in use');

    const hashed = await bcrypt.hash(data.password, 10);

    const newUser: User = {
      id: crypto.randomUUID(),
      email: data.email,
      password: hashed,
      name: data.name,
      role: data.role ?? 'JOBSEEKER',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    db.data.users.push(newUser);
    await db.write();

    return toSafeUser(newUser);
  },

  async getUserById(id: string): Promise<SafeUser | null> {
    const user = db.data.users.find((u: User) => u.id === id) ?? null;
    return user ? toSafeUser(user) : null;
  },
};
