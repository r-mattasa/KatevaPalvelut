CREATE TABLE "services" (
  "service_id" integer PRIMARY KEY,
  "name" varchar,
  "description" varchar,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "subservices" (
  "subservice_id" integer PRIMARY KEY,
  "name" varchar,
  "description" text,
  "service_id" integer NOT NULL,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "subserviceproviderprofiles" (
  "profile_id" integer PRIMARY KEY,
  "name" varchar,
  "email" varchar NOT NULL,
  "phone_number" integer,
  "active" bool DEFAULT true,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "subserviceprovider" (
  "providersubservice_id" integer PRIMARY KEY,
  "provider_profile_id" integer,
  "subservice_id" integer,
  "price" decimal,
  "description" text,
  "experience_years" integer
);

CREATE TABLE "customers" (
  "customer_id" integer PRIMARY KEY,
  "name" varchar NOT NULL,
  "email" varchar NOT NULL,
  "phone_number" integer NOT NULL,
  "notes" varchar,
  "registerd_member" bool,
  "password" varchar,
  "date_of_booking" timestamp,
  "booking_status" "ENUM(Pending,Confirmed,Cancelled,Completed)",
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "bookings" (
  "booking_id" integer PRIMARY KEY,
  "subservice_id" integer NOT NULL,
  "subservice_provider_id" integer NOT NULL,
  "customer_id" integer NOT NULL,
  "booking_status" "ENUM(requested,accepted,confirmed,in_progress,completed,cancelled)",
  "bookeing_date" datetime,
  "start_time" timestamp NOT NULL,
  "end_time" timestamp NOT NULL,
  "total_hours" integer,
  "created_at" timestamp DEFAULT (now())
);

COMMENT ON COLUMN "subservices"."description" IS 'Content of the post';

COMMENT ON COLUMN "subserviceprovider"."description" IS 'Content of the post';

ALTER TABLE "subservices" ADD FOREIGN KEY ("service_id") REFERENCES "services" ("service_id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "bookings" ADD FOREIGN KEY ("subservice_id") REFERENCES "subservices" ("subservice_id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "bookings" ADD FOREIGN KEY ("customer_id") REFERENCES "customers" ("customer_id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "subserviceprovider" ADD FOREIGN KEY ("provider_profile_id") REFERENCES "subserviceproviderprofiles" ("profile_id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "subserviceprovider" ADD FOREIGN KEY ("subservice_id") REFERENCES "subservices" ("subservice_id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "bookings" ADD FOREIGN KEY ("subservice_provider_id") REFERENCES "subserviceprovider" ("providersubservice_id") DEFERRABLE INITIALLY IMMEDIATE;
