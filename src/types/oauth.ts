import { AuthProvider } from "./user"

export interface OAuthProfile {

  provider: AuthProvider

  providerAccountId: string

  email: string

  name?: string | null

  avatar?: string | null
}
