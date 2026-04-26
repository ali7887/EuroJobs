import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL!;

declare global {
  var postgresClient: ReturnType<typeof postgres> | undefined;
}

const client =
  globalThis.postgresClient ||
  postgres(connectionString, {
    max: 1,
    idle_timeout: 20,
    connect_timeout: 10,
  });

if (process.env.NODE_ENV !== "production") globalThis.postgresClient = client;

export const db = drizzle(client, { schema });
