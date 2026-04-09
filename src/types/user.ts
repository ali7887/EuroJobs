export type AuthProvider =
  | "local"
  | "google"
  | "github"
  | "linkedin"

export type UserRole =
  | "admin"
  | "employer"
  | "jobseeker"

export interface User {

  id: string

  email: string

  passwordHash?: string | null

  name?: string | null

  avatar?: string | null

  role: UserRole

  provider: AuthProvider

  providerAccountId?: string | null

  createdAt: string
}
