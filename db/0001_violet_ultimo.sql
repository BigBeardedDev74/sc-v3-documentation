CREATE TABLE IF NOT EXISTS "Users" (
	"user_name" text NOT NULL,
	"user_email" text PRIMARY KEY NOT NULL,
	"role" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP TABLE "user_messages";