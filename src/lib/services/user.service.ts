import bcrypt from "bcryptjs";
import { UserRepository } from "../repositories/user.repository";

import type { User, SafeUser } from "../db/schema";

import {
  userRegisterSchema,
  userUpdateSchema,
} from "../validators/user.validator";

const SALT_ROUNDS = 12;

/**
 * Normalize role values
 */
function normalizeRole(
  role?: string
): "jobseeker" | "employer" | "admin" {
  if (!role) return "jobseeker";

  const map: Record<string, "jobseeker" | "employer" | "admin"> = {
    jobseeker: "jobseeker",
    employer: "employer",
    admin: "admin",
    JOBSEEKER: "jobseeker",
    EMPLOYER: "employer",
    ADMIN: "admin",
  };

  return map[role] ?? "jobseeker";
}

/**
 * Remove sensitive fields
 */
function toSafeUser(user: User): SafeUser {
  const { passwordHash: _passwordHash, ...safe } = user;
  return safe as SafeUser;
}

export class UserService {
  createUser(arg0: { email: string; password: string; name: string; }) {
    throw new Error("Method not implemented.");
  }
  findByEmail(email: string) {
    throw new Error("Method not implemented.");
  }
  comparePassword(password: string, passwordHash: any) {
    throw new Error("Method not implemented.");
  }
  findById(arg0: number) {
    throw new Error('Method not implemented.');
  }
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  /**
   * Register
   */
  async register(data: unknown): Promise<SafeUser> {
    const validated = userRegisterSchema.parse(data);

    const existing = await this.repository.findByEmail(validated.email);

    if (existing) {
      throw new Error("Email already exists");
    }

    const passwordHash = await bcrypt.hash(validated.password, SALT_ROUNDS);

    const role =
      typeof validated.role === "string"
        ? normalizeRole(validated.role)
        : "jobseeker";

    const user = await this.repository.create({
      name: validated.name,
      email: validated.email,
      passwordHash,
      role,
    });

    return toSafeUser(user);
  }

  /**
   * Get user by ID
   */
  async getUserById(id: number): Promise<SafeUser> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return toSafeUser(user);
  }

  /**
   * Get user by email
   */
  async getUserByEmail(email: string): Promise<SafeUser> {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    return toSafeUser(user);
  }

  /**
   * List users
   */
  async listUsers(): Promise<SafeUser[]> {
    const users = (await this.repository.findAll()) as unknown as User[];

    return users.map((u: User) => toSafeUser(u));
  }

  /**
   * Update user
   */
  async updateUser(id: number, data: unknown): Promise<SafeUser> {
    const validated = userUpdateSchema.parse(data);

    const updateData: Partial<User> = {
      ...(validated as Partial<User>),
    };

    if ("password" in validated && validated.password) {
      updateData.passwordHash = await bcrypt.hash(
        validated.password,
        SALT_ROUNDS
      );

      delete (updateData as Record<string, unknown>).password;
    }

    if ("role" in validated && typeof validated.role === "string") {
      updateData.role = normalizeRole(validated.role);
    }

    const updated = await this.repository.update(id, updateData);

    if (!updated) {
      throw new Error("User not found");
    }

    return toSafeUser(updated);
  }

  /**
   * Delete user
   */
  async deleteUser(id: number): Promise<{ success: true }> {
    const deleted = await this.repository.delete(id);

    if (!deleted) {
      throw new Error("User not found");
    }

    return { success: true };
  }

  /**
   * Verify credentials
   */
  async verifyCredentials(
    email: string,
    plainPassword: string
  ): Promise<SafeUser> {
    const user = await this.repository.findByEmail(email);

    if (!user || !user.passwordHash) {
      throw new Error("Invalid credentials");
    }

    const isValid = await bcrypt.compare(plainPassword, user.passwordHash);

    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    return toSafeUser(user);
  }
}

export const userService = new UserService();

export type { SafeUser };
