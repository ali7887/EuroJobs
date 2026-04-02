// src/lib/services/auth.service.ts
import jwt, { type SignOptions } from 'jsonwebtoken';
import { userService } from '@/modules/users/user.service';
import type { SafeUser } from '@/modules/users/user.service'; // ✅ از همون فایل import می‌کنیم

const SECRET = process.env.JWT_SECRET!;
const EXPIRES_IN = (process.env.JWT_EXPIRES_IN ?? '7d') as SignOptions['expiresIn'];

if (!SECRET) {
  throw new Error('JWT_SECRET environment variable is not set');
}

export interface JwtPayload {
  userId: string;
  role: string;
  iat?: number;
  exp?: number;
}

export interface AuthResult {
  accessToken: string;
  user: SafeUser;
}

export class AuthService {

  async login(email: string, password: string): Promise<AuthResult> {
    const user = await userService.verifyCredentials(email, password);
    if (!user) throw new Error('Invalid email or password');

    const payload: JwtPayload = { userId: user.id, role: user.role };
    const accessToken = jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN });

    return { accessToken, user };
  }

  async register(data: {
    email: string;
    password: string;
    name: string;
    role?: 'JOBSEEKER' | 'EMPLOYER';
  }): Promise<AuthResult> {
    const user = await userService.createUser(data);

    const accessToken = jwt.sign(
      { userId: user.id, role: user.role },
      SECRET,
      { expiresIn: EXPIRES_IN }   // ✅ حالا type درسته
    );

    return { accessToken, user };
  }

  verifyToken(token: string): JwtPayload {
    try {
      return jwt.verify(token, SECRET) as JwtPayload;
    } catch {
      throw new Error('Invalid or expired token');
    }
  }
}

export const authService = new AuthService();
