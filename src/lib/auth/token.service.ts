import crypto from 'crypto';
import { TokenRepository } from '@/lib/auth/token.repository';
import { signAccessToken, signRefreshToken } from '@/lib/jwt/jwt.utils';
import { AuthError, AuthErrorCode } from '@/lib/types/auth.types';
import type { StoredRefreshToken, TokenPair } from '@/lib/types/token.types';

const REFRESH_EXPIRY_DAYS = 7;

export const TokenService = {
  async createTokenPair(userId: string, role: string): Promise<TokenPair> {
    const tokenId = crypto.randomUUID();

    const [accessToken, refreshToken] = await Promise.all([
      signAccessToken({ userId, role }),
      signRefreshToken({ tokenId, userId }),
    ]);

    const expiresAt = new Date(
      Date.now() + REFRESH_EXPIRY_DAYS * 24 * 60 * 60 * 1000
    ).toISOString();

    const stored: StoredRefreshToken = {
      id: tokenId,
      userId,
      tokenHash: hashToken(refreshToken),
      expiresAt,
      createdAt: new Date().toISOString(),
      isRevoked: undefined
    };

    await TokenRepository.save(stored);

    return { accessToken, refreshToken };
  },

  async rotateRefreshToken(rawRefreshToken: string): Promise<TokenPair> {
    const existing = await TokenRepository.findByTokenHash(rawRefreshToken);

    if (!existing) {
      const revokedToken = await TokenRepository.findAnyByHash(rawRefreshToken);

      if (revokedToken) {
        await TokenRepository.revokeAllByUserId(revokedToken.userId);

        throw new AuthError(
          AuthErrorCode.TOKEN_REUSE_DETECTED,
          'Token reuse detected. All sessions revoked.',
          401
        );
      }

      throw new AuthError(
        AuthErrorCode.TOKEN_INVALID,
        'Invalid refresh token',
        401
      );
    }

    if (new Date(existing.expiresAt) < new Date()) {
      throw new AuthError(
        AuthErrorCode.TOKEN_EXPIRED,
        'Refresh token expired',
        401
      );
    }

    const role = await getUserRole(existing.userId);

    const tokenId = crypto.randomUUID();

    const [accessToken, newRefreshToken] = await Promise.all([
      signAccessToken({ userId: existing.userId, role }),
      signRefreshToken({ tokenId, userId: existing.userId }),
    ]);

    const expiresAt = new Date(
      Date.now() + REFRESH_EXPIRY_DAYS * 24 * 60 * 60 * 1000
    ).toISOString();

    const newStored: StoredRefreshToken = {
      id: tokenId,
      userId: existing.userId,
      tokenHash: hashToken(newRefreshToken),
      expiresAt,
      createdAt: new Date().toISOString(),
      isRevoked: undefined
    };

    await Promise.all([
      TokenRepository.markReplaced(existing.id, tokenId),
      TokenRepository.save(newStored),
    ]);

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  },

  async revokeToken(rawRefreshToken: string): Promise<void> {
    const token = await TokenRepository.findByTokenHash(rawRefreshToken);

    if (token) {
      await TokenRepository.revoke(token.id);
    }
  },

  async revokeAllUserTokens(userId: string): Promise<void> {
    await TokenRepository.revokeAllByUserId(userId);
  },
};

function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

async function getUserRole(userId: string): Promise<string> {
  const { getDb } = await import('@/infrastructure/lowdb.client');
  const db = await getDb();

  const user = db.data!.users.find((u) => u.id === userId);

  return user?.role ?? 'jobseeker';
}
