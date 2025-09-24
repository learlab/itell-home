CREATE TABLE "contact_submissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text,
	"org_email" text NOT NULL,
	"org_name" text NOT NULL,
	"message" text NOT NULL
);
