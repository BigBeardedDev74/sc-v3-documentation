import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import "dotenv/config";

// @ts-ignore
const client = postgres(process.env.NEON_DB_URL);
export const db = drizzle(client, {});
