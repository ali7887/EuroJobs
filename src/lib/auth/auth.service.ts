import crypto from "crypto";
import { userService } from "@/lib/services/user.service";
import { TokenRepository } from "@/lib/auth/token.repository";
import { signAccessToken } from "@/lib/jwt/jwt.utils";

function generateRefreshToken() {
  return crypto.randomBytes(32).toString("hex");
}

function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

// یک تایپ‌گارد امن
function isUser(value: any): value is { id: number; role: string } {
  return (
    value &&
    typeof value === "object" &&
    typeof value.id === "number" &&
    typeof value.role === "string"
  );
}

export const authService = {
  async register(data: { email: string; password: string; name: string }) {
    const user = await userService.register(data);

    const tokens = await this.createTokens({
      id: user.id,
      role: user.role ?? "user",
    });

    return { user, tokens };
  },

  async login(data: { email: string; password: string }) {
    const user = await userService.verifyCredentials(
      data.email,
      data.password
    );

    const tokens = await this.createTokens({
      id: user.id,
      role: user.role ?? "user",
    });

    return { user, tokens };
  },

  async refresh(refreshToken: string) {
    const tokenHash = hashToken(refreshToken);
    const stored = await TokenRepository.findByHash(tokenHash);

    if (!stored || stored.isRevoked || !stored.userId) {
      throw new Error("Invalid refresh token");
    }

    const user = await userService.findById(Number(stored.userId));

    // حل ارور TS1345 و TS2339:
    if (!isUser(user)) {
      throw new Error("User not found");
    }

    const tokens = await this.createTokens({
      id: user.id,
      role: user.role ?? "USER",
    });

    await TokenRepository.revoke(stored.id);
    return tokens;
  },

  async logout(refreshToken: string) {
    if (!refreshToken) return;

    const tokenHash = hashToken(refreshToken);
    const stored = await TokenRepository.findByHash(tokenHash);

    if (stored) await TokenRepository.revoke(stored.id);
  },

  async logoutAll(userId: number) {
    await TokenRepository.revokeAllByUserId(userId);
  },

  async createTokens(user: { id: number; role: string }) {
    const accessToken = await signAccessToken({
      userId: String(user.id),
      sub: String(user.id),
      role: user.role,
    });

    const refreshToken = generateRefreshToken();
    const tokenHash = hashToken(refreshToken);

    await TokenRepository.store({
      userId: user.id,
      tokenHash,
      isRevoked: false,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    });

    return { accessToken, refreshToken };
  },
};
