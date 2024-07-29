CREATE TABLE IF NOT EXISTS "ConfigOptions" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL,
	"desc" varchar(1024) NOT NULL,
	"type" varchar(256) NOT NULL,
	"keywords" varchar(256),
	"required" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_messages" (
	"user_id" text PRIMARY KEY NOT NULL,
	"create_ts" timestamp DEFAULT now() NOT NULL,
	"message" text NOT NULL
);
