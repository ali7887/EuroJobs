// src/modules/users/user.repository.ts
import { getDb, saveDb } from '@/infrastructure/lowdb.client';
import type { User, SafeUser } from '@/lib/db/schema';

export const UserRepository = {
  async findByEmail(email: string): Promise<User | undefined> {
    const db = await getDb();
    return db.data!.users.find((u) => u.email === email.toLowerCase());
  },

  async findById(id: string): Promise<User | undefined> {
    const db = await getDb();
    return db.data!.users.find((u) => u.id === id);
  },

  async create(user: User): Promise<SafeUser> {
    const db = await getDb();
    db.data!.users.push(user);
    await saveDb();
    const { passwordHash: _, ...safeUser } = user;
    return safeUser;
  },

  async existsByEmail(email: string): Promise<boolean> {
    const db = await getDb();
    return db.data!.users.some((u) => u.email === email.toLowerCase());
  },

  toSafeUser(user: User): SafeUser {
    const { passwordHash: _, ...safeUser } = user;
    return safeUser;
  },
};
