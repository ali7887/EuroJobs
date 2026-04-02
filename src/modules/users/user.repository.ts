// src/modules/users/user.repository.ts
import { db, saveDB } from '@/lib/db/db';
import type { User, SafeUser } from '@/lib/db/schema';

export async function findByEmail(email: string): Promise<User | null> {
  await db.read();
  return db.data.users.find(u => u.email === email) ?? null;
}

export async function findById(id: string): Promise<User | null> {
  await db.read();
  return db.data.users.find(u => u.id === id) ?? null;
}

export async function createUser(user: User): Promise<void> {
  await db.read();
  db.data.users.push(user);
  await saveDB();
}

export function toSafeUser(user: User): SafeUser {
  const { password: _, ...safe } = user;
  return safe;
}
