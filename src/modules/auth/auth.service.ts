import { OAuthProfile } from "@/types/oauth"
import { UserRepository } from "../../modules/users/user.repository"
import { sessionService } from "../../lib/auth/session/session.service"
import { TokenService } from "../../lib/auth/token.service"

export async function oauthLogin(profile: OAuthProfile) {

  let user = await UserRepository.findByEmail(profile.email)

  if (!user) {

    user = await UserRepository.create({

      email: profile.email,

      // OAuth ممکن است name ندهد
      name: profile.name ?? "User",

      // چون schema تو passwordHash اجباری است
      passwordHash: "OAUTH_USER",

      avatarUrl: profile.avatar ?? undefined,

      role: "jobseeker"

    })

  }

  if (!user) {
    throw new Error("User creation failed")
  }

  const tokens = await TokenService.createTokenPair(
    user.id,
    user.role
  )

  await sessionService.createSession(
    user.id,
    tokens.refreshToken
  )

  return {
    user,
    tokens
  }
}
