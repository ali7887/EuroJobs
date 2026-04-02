import { UserRepository } from '../repositories/user.repository';
import { User } from '../db/schema';

export class UserService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  // ✅ متد مورد نیاز route
  async getUsers(): Promise<User[]> {
    return this.repository.findAll();
  }

  async getUserById(id: string): Promise<User | undefined> {
    return this.repository.findById(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.repository.findByEmail(email);
  }

  async createUser(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const user: User = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return this.repository.create(user);
  }

  async updateUser(
    id: string,
    data: Partial<Omit<User, 'id' | 'createdAt'>>
  ): Promise<User | undefined> {
    return this.repository.update(id, data);
  }

  async deleteUser(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }
}

export const userService = new UserService();
