import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { ConfigOptions } from "./schema.js";
import configOptions from "../src/data/configOptions.json" assert { type: "json" };
import dotenv from "dotenv";
import * as schema from "./schema.js";

dotenv.config();

// console.log("DB_URL", import.meta.env);
const sql = neon(
  "postgresql://mdaugherty:7Mc5TXGOpDFC@ep-white-rain-a4pz73lx.us-east-1.aws.neon.tech/v3docs?sslmode=require",
  { debug: true }
);
const db = drizzle(sql, { schema });

const main = async () => {
  const data = [];

  for (const option of configOptions) {
    data.push(option);
  }

  // console.log("Data", data);
  // console.log("db", sql, db);

  console.log("Seed start");

  await db.insert(ConfigOptions).values(data);
  console.log("Seed done");
};

main();
