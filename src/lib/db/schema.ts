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

export const Users = pgTable("Users", {
  id: serial("id").notNull(),
  user_email: varchar("user_email", { length: 256 }).primaryKey().notNull(),
  user_name: varchar("user_name", { length: 256 }).notNull(),
  role: varchar("role", { length: 256 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
