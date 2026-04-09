import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

import * as schema from "./schema";

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "1234", // رمز واقعی PostgreSQL
  database: "jobboard_db",
  port: 5432,
});

export const db = drizzle(pool, { schema });
