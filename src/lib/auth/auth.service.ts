// src/lib/auth/auth.service.ts
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { UserRepository } from '@/modules/users/user.repository';
import { TokenService } from '@/lib/auth/token.service';
import { AuthError, AuthErrorCode } from '@/lib/types/auth.types';
import type { AuthResult, LoginInput, RegisterInput } from '@/lib/types/auth.types';

const SALT_ROUNDS = 12;

export const AuthService = {
  async register(input: RegisterInput): Promise<AuthResult> {
    const exists = await UserRepository.existsByEmail(input.email);
    if (exists) {
      throw new AuthError(
        AuthErrorCode.USER_ALREADY_EXISTS,
        'Email already registered',
        409
      );
    }

    const passwordHash = await bcrypt.hash(input.password, SALT_ROUNDS);
    const now = new Date().toISOString();

    const newUser = {
      id           : crypto.randomUUID(),
      email        : input.email.toLowerCase(),
      passwordHash,
      name         : input.name,
      role         : input.role ?? 'jobseeker' as const,
      createdAt    : now,
      updatedAt    : now,
    };

    const safeUser = await UserRepository.create(newUser);
    const tokens   = await TokenService.createTokenPair(safeUser.id, safeUser.role);

    return { user: safeUser, tokens };
  },

  async login(input: LoginInput): Promise<AuthResult> {
    const user = await UserRepository.findByEmail(input.email);
    if (!user) {
      // ✅ timing-safe: همیشه bcrypt اجرا می‌شود
      await bcrypt.compare(input.password, '$2b$12$invalidhashfortimingsafety000000000000000');
      throw new AuthError(
        AuthErrorCode.INVALID_CREDENTIALS,
        'Invalid email or password',
        401
      );
    }

    const isValid = await bcrypt.compare(input.password, user.passwordHash);
    if (!isValid) {
      throw new AuthError(
        AuthErrorCode.INVALID_CREDENTIALS,
        'Invalid email or password',
        401
      );
    }

    const safeUser = UserRepository.toSafeUser(user);
    const tokens   = await TokenService.createTokenPair(safeUser.id, safeUser.role);

    return { user: safeUser, tokens };
  },

  async refresh(rawRefreshToken: string): Promise<AuthResult> {
    const tokens = await TokenService.rotateRefreshToken(rawRefreshToken);

    // دریافت اطلاعات کاربر از token جدید
    const { verifyAccessToken } = await import('@/lib/jwt/jwt.utils');
    const payload  = await verifyAccessToken(tokens.accessToken);
    const user     = await UserRepository.findById(payload.userId);

    if (!user) {
      throw new AuthError(AuthErrorCode.USER_NOT_FOUND, 'User not found', 401);
    }

    return { user: UserRepository.toSafeUser(user), tokens };
  },

  async logout(rawRefreshToken: string): Promise<void> {
    await TokenService.revokeToken(rawRefreshToken);
  },

  async logoutAll(userId: string): Promise<void> {
    await TokenService.revokeAllUserTokens(userId);
  },
};
