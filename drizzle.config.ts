import { defineConfig } from "drizzle-kit";
import "dotenv/config";

export default defineConfig({
  schema: "./db/schema.ts",
  dialect: "postgresql",
  out: "./db",
  dbCredentials: {
    connectionString: process.env.NEON_DB_URL,
    url: process.env.NEON_DB_URL,
  },
});
