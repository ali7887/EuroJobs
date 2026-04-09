// src/modules/users/user.service.ts
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import { db } from '@/lib/db/db';
import type { User, SafeUser, UserRole } from '@/lib/db/schema';

// ─── Helper ───────────────────────────────────────────────────────────────────

function toSafeUser(user: User): SafeUser {
  const { passwordHash: _, ...safe } = user;
  return safe;
}

// ─── Standalone exports (برای token.service و auth.service) ──────────────────

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

export async function findUserById(id: string): Promise<User | null> {
  await db.read();
  return db.data.users.find(u => u.id === id) ?? null;
}

// ─── userService ──────────────────────────────────────────────────────────────

export const userService = {

  async findById(id: string): Promise<SafeUser | null> {
    const user = await findUserById(id);
    return user ? toSafeUser(user) : null;
  },

  async findByEmail(email: string): Promise<User | null> {
    await db.read();
    return db.data.users.find(u => u.email === email) ?? null;
  },

  async verifyCredentials(
    email: string,
    password: string,
  ): Promise<SafeUser | null> {
    const user = await this.findByEmail(email);
    if (!user) return null;

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return null;

    return toSafeUser(user);
  },

  async createUser(data: {
    email: string;
    password: string;
    name: string;
    role?: UserRole;
  }): Promise<SafeUser> {
    await db.read();

    const exists = db.data.users.some(u => u.email === data.email);
    if (exists) throw new Error('Email already in use');

    const now = new Date().toISOString();
    const newUser: User = {
      id: randomUUID(),
      email: data.email,
      passwordHash: await bcrypt.hash(data.password, 10),
      name: data.name,
      role: data.role ?? 'jobseeker',
      createdAt: now,
      updatedAt: now,
      provider: ''
    };

    db.data.users.push(newUser);
    await db.write();

    return toSafeUser(newUser);
  },

  async updateUser(
    id: string,
    data: Partial<Pick<User, 'name' | 'avatarUrl'>>,
  ): Promise<SafeUser | null> {
    await db.read();

    const idx = db.data.users.findIndex(u => u.id === id);
    if (idx === -1) return null;

    db.data.users[idx] = {
      ...db.data.users[idx],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    await db.write();
    return toSafeUser(db.data.users[idx]);
  },
};
