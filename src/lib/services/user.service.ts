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
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  /** REGISTER */
  async register(data: unknown): Promise<SafeUser> {
    const validated = userRegisterSchema.parse(data);

    const existing = await this.repository.findByEmail(validated.email);
    if (existing) throw new Error("Email already exists");

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

  /** GET FULL USER */
  async findById(id: string): Promise<User | null> {
    return this.repository.findById(id);
  }

  /** GET SAFE USER */
  async getUserById(id: string): Promise<SafeUser> {
    const user = await this.repository.findById(id);
    if (!user) throw new Error("User not found");

    return toSafeUser(user);
  }

  /** GET FULL BY EMAIL */
  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findByEmail(email);
  }

  /** GET SAFE BY EMAIL */
  async getUserByEmail(email: string): Promise<SafeUser> {
    const user = await this.repository.findByEmail(email);
    if (!user) throw new Error("User not found");

    return toSafeUser(user);
  }

  /** LIST USERS */
  async listUsers(): Promise<SafeUser[]> {
    const users = await this.repository.findAll();
    return users.map(toSafeUser);
  }

  /** UPDATE PASSWORD — FIXED UUID TYPE */
  async updatePassword(userId: string, newPassword: string): Promise<User> {
    const passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);

    const updated = await this.repository.update(userId, { passwordHash });
    if (!updated) throw new Error("User not found");

    return updated;
  }

  /** UPDATE USER — FIXED UUID TYPE */
  async updateUser(id: string, data: unknown): Promise<SafeUser> {
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

    if (!updated) throw new Error("User not found");

    return toSafeUser(updated);
  }

  /** DELETE USER — FIXED UUID TYPE */
  async deleteUser(id: string): Promise<{ success: true }> {
    const deleted = await this.repository.delete(id);

    if (!deleted) throw new Error("User not found");

    return { success: true };
  }

  /** VERIFY LOGIN */
  async verifyCredentials(
    email: string,
    plainPassword: string
  ): Promise<User> {
    const user = await this.repository.findByEmail(email);

    if (!user || !user.passwordHash) {
      throw new Error("Invalid credentials");
    }

    const isValid = await bcrypt.compare(plainPassword, user.passwordHash);

    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    return user;
  }
}

export const userService = new UserService();
export type { SafeUser };
