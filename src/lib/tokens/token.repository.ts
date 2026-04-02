// src/lib/tokens/token.repository.ts
import crypto from 'crypto';
import { db, saveDB } from '@/lib/db/db';
import type { RefreshToken } from '@/lib/db/schema';

function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export async function storeRefreshToken(
  tokenId: string,
  userId: string,
  rawToken: string
): Promise<void> {
  await db.read();

  const token: RefreshToken = {
    id: tokenId,
    userId,
    tokenHash: hashToken(rawToken),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
    isRevoked: false,
  };

  db.data.refreshTokens.push(token);
  await saveDB();
}

export async function findRefreshToken(tokenId: string): Promise<RefreshToken | null> {
  await db.read();
  return db.data.refreshTokens.find((t: RefreshToken) => t.id === tokenId) ?? null;
}

export async function revokeToken(tokenId: string): Promise<void> {
  await db.read();

  const token = db.data.refreshTokens.find((t: RefreshToken) => t.id === tokenId);
  if (token) {
    token.isRevoked = true;
    token.revokedAt = new Date().toISOString();
    await saveDB();
  }
}

export async function revokeAllUserTokens(userId: string): Promise<void> {
  await db.read();

  const now = new Date().toISOString();
  db.data.refreshTokens
    .filter((t: RefreshToken) => t.userId === userId)
    .forEach((t: RefreshToken) => {
      t.isRevoked = true;
      t.revokedAt = now;
    });

  await saveDB();
}

export function verifyTokenHash(rawToken: string, storedHash: string): boolean {
  return hashToken(rawToken) === storedHash;
}
  