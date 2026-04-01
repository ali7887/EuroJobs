import { db, initDB } from "@/lib/db/db";
import { User } from "@/lib/db/schema";
import { v4 as uuidv4 } from "uuid";

export class UserRepository {
  async findAll(): Promise<User[]> {
    await initDB();
    return db.data!.users;
  }

  async findById(id: string): Promise<User | undefined> {
    await initDB();
    return db.data!.users.find((u) => u.id === id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    await initDB();
    return db.data!.users.find((u) => u.email === email);
  }

  async create(input: Omit<User, "id" | "createdAt">): Promise<User> {
    await initDB();
    const user: User = { id: uuidv4(), ...input, createdAt: new Date().toISOString() };
    db.data!.users.push(user);
    await db.write();
    return user;
  }

  async update(id: string, input: Partial<Omit<User, "id" | "createdAt">>): Promise<User | null> {
    await initDB();
    const idx = db.data!.users.findIndex((u) => u.id === id);
    if (idx === -1) return null;
    db.data!.users[idx] = { ...db.data!.users[idx], ...input };
    await db.write();
    return db.data!.users[idx];
  }

  async delete(id: string): Promise<boolean> {
    await initDB();
    const before = db.data!.users.length;
    db.data!.users = db.data!.users.filter((u) => u.id !== id);
    await db.write();
    return db.data!.users.length < before;
  }
}

export const userRepository = new UserRepository();
