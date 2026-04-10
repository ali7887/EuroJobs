// src/lib/types/category.types.ts

export type Category = {
  id: number
  name: string
}

export type CategoryCreate = Omit<Category, "id">

export type CategoryWithJobCount = Category & {
  jobCount: number
}