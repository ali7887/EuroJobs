// src/lib/types/user.types.ts

import { User } from '../db/schema';

export type UserPublic = Omit<User, 'passwordHash'>;

export type UserCreate = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

export type UserUpdate = Partial<Omit<User, 'id' | 'email' | 'createdAt'>>;

export type UserLogin = {
  email: string;
  password: string;
};

export type UserListItem = Pick<User, 'id' | 'name' | 'email' | 'role' | 'createdAt'>;
