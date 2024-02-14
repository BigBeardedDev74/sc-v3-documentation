import { drizzle } from "drizzle-orm/node-postgres";
import { neon } from "@neondatabase/serverless";
import { ConfigOptions } from "./schema.js";
import configOptions from "../src/data/configOptions.js";
import dotenv from "dotenv";

dotenv.config();

// console.log("DB_URL", import.meta.env);

const main = async () => {
  const sql = neon(
    "postgresql://mdaugherty:7Mc5TXGOpDFC@ep-white-rain-a4pz73lx.us-east-1.aws.neon.tech/v3docs?sslmode=require",
    { debug: true }
  );
  const db = drizzle(sql);
  const data = [];

  for (const option of configOptions) {
    data.push(option);
  }

  console.log("Seed start");

  console.log(data);
  await db.insert(ConfigOptions).values(data);
  console.log("Seed done");
};

main();
