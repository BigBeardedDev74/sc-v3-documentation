import "dotenv/config";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const db = drizzle(
  postgres(`${process.env.DB_URL}`, { ssl: "require", max: 1 })
);

try {
  await migrate(db, { migrationsFolder: "db" });
  console.log("Migration complete");
} catch (e) {
  console.error(e);
}
process.exit();
