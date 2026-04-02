import bcrypt from 'bcryptjs';
import { UserRepository } from '../repositories/user.repository';
import { SafeUser } from '../db/schema';
import {
  userRegisterSchema,
  userUpdateSchema,
} from '../validators/user.validator';

const SALT_ROUNDS = 12;

// پسورد را از user object حذف می‌کند
function toSafeUser(user: { password?: string; [key: string]: unknown }): SafeUser {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _pwd, ...safe } = user;
  return safe as SafeUser;
}

export class UserService {
  private repository = new UserRepository();

  // ── Register ──────────────────────────────────────────────────────────────
  async register(data: unknown): Promise<SafeUser> {
    const validated = userRegisterSchema.parse(data);

    // بررسی تکراری بودن ایمیل
    const existing = await this.repository.findByEmail(validated.email);
    if (existing) throw new Error('Email already exists');

    // هش کردن پسورد قبل از ذخیره
    const hashedPassword = await bcrypt.hash(validated.password, SALT_ROUNDS);

    const user = await this.repository.create({
      name: validated.name,
      email: validated.email,
      password: hashedPassword,
      role: validated.role,
    });

    return toSafeUser(user);
  }

  // ── Get by ID ─────────────────────────────────────────────────────────────
  async getUserById(id: string): Promise<SafeUser> {
    const user = await this.repository.findById(id);
    if (!user) throw new Error('User not found');
    return toSafeUser(user);
  }

  // ── Get by Email ──────────────────────────────────────────────────────────
  async getUserByEmail(email: string): Promise<SafeUser> {
    const user = await this.repository.findByEmail(email);
    if (!user) throw new Error('User not found');
    return toSafeUser(user);
  }

  // ── Update ────────────────────────────────────────────────────────────────
  async updateUser(id: string, data: unknown): Promise<SafeUser> {
    const validated = userUpdateSchema.parse(data);

    // اگر پسورد جدید ارسال شده، هش کن
    const updateData = { ...validated };
    if (validated.password) {
      updateData.password = await bcrypt.hash(validated.password, SALT_ROUNDS);
    }

    const updated = await this.repository.update(id, updateData);
    if (!updated) throw new Error('User not found');
    return toSafeUser(updated);
  }

  // ── Delete ────────────────────────────────────────────────────────────────
  async deleteUser(id: string): Promise<{ success: true }> {
    const deleted = await this.repository.delete(id);
    if (!deleted) throw new Error('User not found');
    return { success: true };
  }

  // ── Verify Credentials (برای Login بعدی) ─────────────────────────────────
  async verifyCredentials(
    email: string,
    plainPassword: string,
  ): Promise<SafeUser> {
    const user = await this.repository.findByEmail(email);
    if (!user) throw new Error('Invalid credentials');

    const isValid = await bcrypt.compare(plainPassword, user.password);
    if (!isValid) throw new Error('Invalid credentials');

    return toSafeUser(user);
  }
}

export const userService = new UserService();
