import { userRepository } from "@/lib/repositories/user.repository";
import { User } from "@/lib/db/schema";

export class UserService {
  async getUsers(): Promise<Omit<User, "passwordHash">[]> {
    const users = await userRepository.findAll();
    return users.map(({ passwordHash: _, ...u }) => u);
  }

  async getUserById(id: string): Promise<Omit<User, "passwordHash"> | null> {
    const user = await userRepository.findById(id);
    if (!user) return null;
    const { passwordHash: _, ...rest } = user;
    return rest;
  }

  async createUser(input: Omit<User, "id" | "createdAt">): Promise<Omit<User, "passwordHash">> {
    const user = await userRepository.create(input);
    const { passwordHash: _, ...rest } = user;
    return rest;
  }

  async updateUser(id: string, input: Partial<Omit<User, "id" | "createdAt">>): Promise<Omit<User, "passwordHash"> | null> {
    const user = await userRepository.update(id, input);
    if (!user) return null;
    const { passwordHash: _, ...rest } = user;
    return rest;
  }

  async deleteUser(id: string): Promise<boolean> {
    return userRepository.delete(id);
  }
}

export const userService = new UserService();
