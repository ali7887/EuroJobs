// src/lib/auth/token.repository.ts
import type { StoredRefreshToken } from '@/lib/types/token.types';
import { getDb, saveDb } from '@/infrastructure/lowdb.client';

export const TokenRepository = {
  async save(token: StoredRefreshToken): Promise<void> {
    const db = await getDb();
    // فرض: db.data.refreshTokens: StoredRefreshToken[]
    db.data!.refreshTokens.push(token);
    await saveDb();
  },

  async findByTokenHash(rawOrHashedToken: string): Promise<StoredRefreshToken | null> {
    const db = await getDb();

    // اینجا دو سناریو:
    // 1) raw token آمده، باید hash کنیم.
    // 2) مستقیم hash پاس داده شده؛ در این case نیازی به hash دوباره نیست.
    //
    // الان در TokenService از rawRefreshToken استفاده شده و hashing جداست.
    // برای سادگی اولیه، فرض می‌کنیم raw token است و همیشه hash می‌کنیم.
    const crypto = await import('crypto');
    const hash = crypto.createHash('sha256').update(rawOrHashedToken).digest('hex');

    const found = db.data!.refreshTokens.find(t => t.tokenHash === hash && !t.isRevoked);
    return found ?? null;
  },

  async revoke(id: string): Promise<void> {
    const db = await getDb();
    const token = db.data!.refreshTokens.find(t => t.id === id);
    if (!token) return;

    token.isRevoked = true;
    await saveDb();
  },

  async revokeAllByUserId(userId: string): Promise<void> {
    const db = await getDb();
    for (const t of db.data!.refreshTokens) {
      if (t.userId === userId) {
        t.isRevoked = true;
      }
    }
    await saveDb();
  },

  async markReplaced(oldId: string, newId: string): Promise<void> {
    const db = await getDb();
    const oldToken = db.data!.refreshTokens.find(t => t.id === oldId);
    if (!oldToken) return;

    oldToken.isRevoked = true;
    // اگر در schema فیلد `replacedByTokenId` داری، اینجا ست کن:
    // (بسته به تعریف واقعی StoredRefreshToken؛ اگر نداری اضافه‌اش کن)
    // (oldToken as any).replacedByTokenId = newId;

    await saveDb();
  },

  // برای reuse detection helper در TokenService:
  async findAnyByHash(rawOrHashedToken: string): Promise<StoredRefreshToken | null> {
    const db = await getDb();
    const crypto = await import('crypto');
    const hash = crypto.createHash('sha256').update(rawOrHashedToken).digest('hex');

    const found = db.data!.refreshTokens.find(t => t.tokenHash === hash);
    return found ?? null;
  },
};
