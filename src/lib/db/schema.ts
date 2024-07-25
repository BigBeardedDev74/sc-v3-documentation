import {
  integer,
  pgTable,
  serial,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";

export const ConfigOptions = pgTable("ConfigOptions", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  desc: varchar("desc", { length: 1024 }).notNull(),
  type: varchar("type", { length: 256 }).notNull(),
  keywords: varchar("keywords", { length: 256 }),
  required: integer("required").notNull().default(0),
  createdAt: timestamp("createdAt"),
  updatedAt: timestamp("updatedAt"),
});
