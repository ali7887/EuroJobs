// src/lib/repositories/user.repository.ts
import { db } from '../db/db';
import { User } from '../db/schema';

export class UserRepository {
  findAll: any;
  async findById(id: string): Promise<User | undefined> {
    await db.read();
    return db.data.users.find(u => u.id === id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    await db.read();
    return db.data.users.find(u => u.email === email);
  }

  async create(user: User): Promise<User> {
    await db.read();
    db.data.users.push(user);
    await db.write();
    return user;
  }

  async update(id: string, data: Partial<User>): Promise<User | undefined> {
    await db.read();
    const index = db.data.users.findIndex(u => u.id === id);
    if (index === -1) return undefined;
    
    db.data.users[index] = { ...db.data.users[index], ...data, updatedAt: new Date().toISOString() };
    await db.write();
    return db.data.users[index];
  }

  async delete(id: string): Promise<boolean> {
    await db.read();
    const index = db.data.users.findIndex(u => u.id === id);
    if (index === -1) return false;
    
    db.data.users.splice(index, 1);
    await db.write();
    return true;
  }
}
