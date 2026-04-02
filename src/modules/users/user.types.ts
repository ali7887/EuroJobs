export type UserRole = 'JOBSEEKER' | 'EMPLOYER' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  name: string;
  createdAt: string;
  updatedAt: string;
}

// SafeUser — هرگز passwordHash را expose نمی‌کند
export type SafeUser = Omit<User, 'passwordHash'>;

export interface CreateUserDTO {
  email: string;
  password: string;
  name: string;
  role?: UserRole;
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  role?: UserRole;
}
