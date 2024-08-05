ALTER TABLE "ConfigOptions" ALTER COLUMN "createdBy" SET DEFAULT 'Mike Daugherty';--> statement-breakpoint
ALTER TABLE "ConfigOptions" ADD COLUMN "updatedBy" varchar(256) DEFAULT '';