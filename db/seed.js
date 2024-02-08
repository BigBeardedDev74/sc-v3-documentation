import { drizzle } from "drizzle-orm/node-postgres";
import postgres from "postgres";
import { ConfigOptions } from "./schema.js";
import configOptions from "../src/data/configOptions.js";

import dotenv from "dotenv";
dotenv.config();

if (!("DB_URL" in process.env))
  throw new Error("DB_URL not found on .env.development");

const main = async () => {
  const db = drizzle(
    postgres(`${process.env.DB_URL}`, { ssl: "require", max: 1 })
  );
  const data = [];

  for (const option of configOptions) {
    data.push(option);
  }

  console.log("Seed start");
  await db.insert(ConfigOptions).values(data);
  console.log("Seed done");
};

main();
