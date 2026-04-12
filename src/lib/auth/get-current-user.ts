import { NextRequest } from "next/server"
import { requireAuth } from "../../lib/middleware/auth.middleware"
import { userService } from "@/lib/services/user.service"

export async function getCurrentUser(req: NextRequest) {

  const payload = await requireAuth(req)

  const user = await userService.findById(payload.userId) as any

  if (!user) {
    throw new Error("User not found")
  }

  return user
}
