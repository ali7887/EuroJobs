import { userRepository } from '../repositories/user.repository';
import type { UserRole } from '../db/schema';
import bcrypt from 'bcryptjs';

export class AuthService {
  async register(data: { email: string; password: string; name: string; role: UserRole }) {
    const passwordHash = await bcrypt.hash(data.password, 10);
    return userRepository.create({
      email: data.email,
      passwordHash,  // ✅ نه password
      name: data.name,
      role: data.role,  // ✅ 'admin' | 'employer' | 'jobseeker'
    });
  }
}
