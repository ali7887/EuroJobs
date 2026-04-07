import { db } from "@/lib/db/db"
import { hashToken } from "./session.utils"
import type { Session } from "@/lib/db/schema"

class SessionService {

  async createSession(
    userId: string,
    refreshToken: string
  ): Promise<Session> {

    const now = new Date()
    const expires = new Date()

    // refresh token expiration (7 days)
    expires.setDate(now.getDate() + 7)

    const session: Session = {
      id: crypto.randomUUID(),
      userId,
      tokenHash: hashToken(refreshToken),
      createdAt: now.toISOString(),
      expiresAt: expires.toISOString(),
    }

    db.data.sessions.push(session)
    await db.write()

    return session
  }

  async findSessionByToken(
    hash: string
  ): Promise<Session | undefined> {

    return db.data.sessions.find(
      (s) => s.tokenHash === hash
    )
  }

  async deleteSession(sessionId: string): Promise<void> {

    db.data.sessions = db.data.sessions.filter(
      (s) => s.id !== sessionId
    )

    await db.write()
  }

  async deleteUserSessions(userId: string): Promise<void> {

    db.data.sessions = db.data.sessions.filter(
      (s) => s.userId !== userId
    )

    await db.write()
  }
}

export const sessionService = new SessionService()
