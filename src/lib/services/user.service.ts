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

  /** ===============================
   *  CREATE (REGISTER)
   * =============================== */
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

  /** ===============================
   *  GET USER BY ID (FULL USER)
   * =============================== */
  async findById(id: number): Promise<User | null> {
    return await this.repository.findById(id);
  }

  /** ===============================
   *  GET SAFE USER BY ID
   * =============================== */
  async getUserById(id: number): Promise<SafeUser> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return toSafeUser(user);
  }

  /** ===============================
   *  GET USER BY EMAIL (FULL USER)
   * =============================== */
  async findByEmail(email: string): Promise<User | null> {
    return await this.repository.findByEmail(email);
  }

  /** ===============================
   *  GET SAFE USER BY EMAIL
   * =============================== */
  async getUserByEmail(email: string): Promise<SafeUser> {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    return toSafeUser(user);
  }

  /** ===============================
   *  LIST USERS (SAFE)
   * =============================== */
  async listUsers(): Promise<SafeUser[]> {
    const users = (this.repository.findAll()) as unknown as User[];
    return users.map((u) => toSafeUser(u));
  }
  async updatePassword(userId: number, newPassword: string) {
  const passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);

  const updated = await this.repository.update(userId, {
    passwordHash,
  });

  if (!updated) {
    throw new Error("User not found");
  }

  return updated;
}


  /** ===============================
   *  UPDATE USER
   * =============================== */
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

  /** ===============================
   *  DELETE USER
   * =============================== */
  async deleteUser(id: number): Promise<{ success: true }> {
    const deleted = await this.repository.delete(id);

    if (!deleted) {
      throw new Error("User not found");
    }

    return { success: true };
  }

  /** ===============================
   *  VERIFY LOGIN
   * =============================== */
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
