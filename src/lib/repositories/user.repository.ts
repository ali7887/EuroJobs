import { db, initDB } from '../db/db';
import { User } from '../db/schema';
import { randomUUID } from 'crypto';

export class UserRepository {
  async findAll(): Promise<User[]> {
    await initDB();
    return db.data!.users;
  }

  async findById(id: string): Promise<User | null> {
    await initDB();
    return db.data!.users.find(u => u.id === id) ?? null;
  }

  async findByEmail(email: string): Promise<User | null> {
    await initDB();
    return db.data!.users.find(u => u.email === email) ?? null;
  }

  async create(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    await initDB();
    const user: User = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...data,
    };
    db.data!.users.push(user);
    await db.write();
    return user;
  }

  async update(id: string, data: Partial<Omit<User, 'id' | 'createdAt'>>): Promise<User | null> {
    await initDB();
    const index = db.data!.users.findIndex(u => u.id === id);
    if (index === -1) return null;
    db.data!.users[index] = {
      ...db.data!.users[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    await db.write();
    return db.data!.users[index];
  }

  async delete(id: string): Promise<boolean> {
    await initDB();
    const index = db.data!.users.findIndex(u => u.id === id);
    if (index === -1) return false;
    db.data!.users.splice(index, 1);
    await db.write();
    return true;
  }
}

// ✅ singleton
export const userRepository = new UserRepository();
