import { NextRequest } from "next/server"
import { verifyAccessToken } from "../auth/token.utils"

export async function requireAuth(req: NextRequest) {

  const authHeader = req.headers.get("authorization")

  if (!authHeader) {
    throw new Error("Unauthorized")
  }

  const token = authHeader.replace("Bearer ", "")

  const payload = await verifyAccessToken(token)

  return payload
}
