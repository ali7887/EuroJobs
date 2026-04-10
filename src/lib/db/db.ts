import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// اتصال به دیتابیس (حتماً در فایل .env مقدار DATABASE_URL را تنظیم کن)
const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);

export const db = drizzle(client, { schema });

// پایان! دیگر نیازی به initDB یا saveDB نیست.
