import {
  integer,
  pgTable,
  serial,
  varchar,
  timestamp,
  text,
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

export const UserMessages = pgTable("user_messages", {
  user_id: text("user_id").primaryKey().notNull(),
  message: text("message").notNull(),
  createTs: timestamp("create_ts").defaultNow().notNull(),
});
