import { pool } from "../db_config/db";
import type { CustomerDetails, NewCustomerData } from "../type/types";
import { executeQuery } from "../db_config/db";

export const createCustomer = async (customer: NewCustomerData) => {
  console.log("customers",customer);
  const query = `INSERT INTO "customers" ("name", "email", "phone_number", "notes", "is_registered_member", "password") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
  const parameters = [customer.name, customer.email, customer.phone_number, customer.notes, customer.is_registerd_member, customer.password];
  const result = await executeQuery(query, parameters);
  return result.rows[0] as CustomerDetails;
}

export const getcustomers = async () => {
  const query = `SELECT * FROM "customers" `;
  const result = await executeQuery(query);
  return result.rows as CustomerDetails[] | null;
};

export const getcustomer = async (id: number) => {
  const query = `SELECT * FROM "customers" WHERE "id" = $1`;
  const parameters = [id];
  const result = await executeQuery(query);
  return result.rows[0] as CustomerDetails | null;
};

export const getCustomerByEmail = async (email: string): Promise<CustomerDetails | null> => {
    const query = `SELECT * FROM "customers" WHERE "email" = $1`;
    const parameters = [email];
   try {
        const result = await executeQuery(query, parameters);
        const existingCustomer: CustomerDetails | undefined = result.rows[0]; 
        return existingCustomer || null;
    } catch (error) {
        console.error("Error fetching customer by email:", error);
        throw new Error("Database error while checking customer existence.");
    }
}

export const deletecustomer = async (id: number) => {
  const query = `DELETE FROM "customers" WHERE "id" = $1 RETURNING *`;
  const parameters = [id];
  const result = await executeQuery(query, parameters);
  return result.rows[0] as CustomerDetails | null;
};