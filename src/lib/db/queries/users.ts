import { db } from "../index";
import { users } from "../schema";

export async function getUsers() {
  return db.select().from(users);
}

export async function createUser(name: string, email: string) {
  const [user] = await db
    .insert(users)
    .values({ name, email })
    .returning();

  return user;
}
