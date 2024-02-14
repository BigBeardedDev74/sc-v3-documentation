import { defineConfig } from "drizzle-kit";
import "dotenv/config";

export default defineConfig({
  schema: "./db/schema.ts",
  driver: "pg",
  out: "./db",
  dbCredentials: {
    connectionString: process.env.NEON_DB_URL,
  },
  verbose: true,
  strict: true,
});
