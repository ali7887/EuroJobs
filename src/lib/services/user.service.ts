// src/lib/services/user.service.ts
import bcrypt from 'bcryptjs';
import { UserRepository } from '../repositories/user.repository';
import type { SafeUser } from '../db/schema';   // ✅ export type برای re-export
import { User } from '../db/schema';
import {
  userRegisterSchema,
  userUpdateSchema,
} from '../validators/user.validator';

const SALT_ROUNDS = 12;

function normalizeRole(role?: string): 'jobseeker' | 'employer' | 'admin' {

  if (!role) return 'jobseeker';

  const map: Record<string, 'jobseeker' | 'employer' | 'admin'> = {
    JOBSEEKER: 'jobseeker',
    EMPLOYER: 'employer',
    ADMIN: 'admin',
  };

  return map[role] ?? (role as any);
}

// ✅ user از نوع User که passwordHash دارد (نه password)
function toSafeUser(user: User): SafeUser {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash: _pwd, ...safe } = user;
  return safe as SafeUser;
}

export class UserService {
  private repository = new UserRepository();

  async register(data: unknown): Promise<SafeUser> {
    const validated = userRegisterSchema.parse(data);

    const existing = await this.repository.findByEmail(validated.email);
    if (existing) throw new Error('Email already exists');

    // ✅ hash می‌کنیم و در passwordHash ذخیره می‌کنیم
    const passwordHash = await bcrypt.hash(validated.password, SALT_ROUNDS);

    const user = await this.repository.create({
      name: validated.name,
      email: validated.email,
      passwordHash,
      role: normalizeRole(validated.role),
      provider: ''
    });

    return toSafeUser(user);
  }

  async getUserById(id: string): Promise<SafeUser> {
    const user = await this.repository.findById(id);
    if (!user) throw new Error('User not found');
    return toSafeUser(user);
  }

  async getUserByEmail(email: string): Promise<SafeUser> {
    const user = await this.repository.findByEmail(email);
    if (!user) throw new Error('User not found');
    return toSafeUser(user);
  }

  async updateUser(id: string, data: unknown): Promise<SafeUser> {
    const validated = userUpdateSchema.parse(data);

    const updateData: Partial<User> = { ...validated } as Partial<User>;

    // ✅ اگر password جدید آمد، hash کن و در passwordHash بریز
    if (validated.password) {
      updateData.passwordHash = await bcrypt.hash(validated.password, SALT_ROUNDS);
      // ✅ password خام را از updateData حذف می‌کنیم (User فیلد password ندارد)
      delete (updateData as Record<string, unknown>)['password'];
    }

    const updated = await this.repository.update(id, updateData);
    if (!updated) throw new Error('User not found');
    return toSafeUser(updated);
  }

  async deleteUser(id: string): Promise<{ success: true }> {
    const deleted = await this.repository.delete(id);
    if (!deleted) throw new Error('User not found');
    return { success: true };
  }

  // ✅ verifyCredentials با passwordHash کار می‌کند
  async verifyCredentials(
    email: string,
    plainPassword: string,
  ): Promise<SafeUser> {
    const user = await this.repository.findByEmail(email);
    if (!user) throw new Error('Invalid credentials');

    // ✅ user.passwordHash نه user.password
    const isValid = await bcrypt.compare(plainPassword, user.passwordHash);
    if (!isValid) throw new Error('Invalid credentials');

    return toSafeUser(user);
  }
}

export const userService = new UserService();

export type { SafeUser };   // ✅ export type برای re-export از ماژول دیگر
