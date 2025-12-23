import { pool } from "../db_config/db";
import type { ProviderProfile } from "../type/types";
import { executeQuery } from "../db_config/db";

export const createProfile = async (profile: ProviderProfile) => {
  const query = `INSERT INTO "service_provider_profiles" ("name", "email", "description", "phone_number", "active", "subservice_id") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
  const parameters = [profile.name, profile.email, profile.description, profile.phone_number, profile.active, profile.subservice_id];
  const result = await executeQuery(query, parameters);
  return result.rows[0] as ProviderProfile;
}

export const getProfile = async () => {
  const query = `SELECT * FROM "service_provider_profiles"`;
  const result = await executeQuery(query);
  return result.rows as ProviderProfile[] | null;
};

export const deleteProfile = async (id: number) => {
  const query = `DELETE FROM "service_provider_profiles" WHERE "id" = $1 RETURNING *`;
  const parameters = [id];
  const result = await executeQuery(query, parameters);
  return result.rows[0] as ProviderProfile | null;
};
