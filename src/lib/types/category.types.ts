// src/lib/types/category.types.ts

import { Category } from '../db/schema';

export type CategoryCreate = Omit<Category, 'id'>;

export type CategoryWithJobCount = Category & {
  jobCount: number;
};
