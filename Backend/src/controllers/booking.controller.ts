import { pool } from "../db_config/db";
import type { BookingDetails, NewBooking } from "../type/types";
import { executeQuery } from "../db_config/db";
import { randomUUID } from "crypto";

export const createBooking = async (booking: NewBooking) => {

  const query = `INSERT INTO "bookings" ("subservice_id", "customer_id", "provider_profile_id", "booking_status", "booking_date", "start_time", "end_time", "total_hours") VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
  const parameters = [ booking.subservice_id, booking.customer_id, booking.provider_profile_id, booking.booking_status, booking.booking_date, booking.start_time, booking.end_time, booking.total_hours];
  const result = await executeQuery(query, parameters);
  return result.rows[0] as BookingDetails;
}

export const getBookings = async () => {
  const query = `SELECT * FROM "bookings" `;
  const result = await executeQuery(query);
  return result.rows as BookingDetails[] | null;
};


export const getBooking = async (id: number) => {
  const query = `SELECT * FROM "bookings" WHERE "id" = $1`;
  const parameters = [id];
  const result = await executeQuery(query);
  return result.rows[0] as BookingDetails | null;
};

export const deleteBooking = async (id: number) => {
  const query = `DELETE FROM "bookings" WHERE "id" = $1 RETURNING *`;
  const parameters = [id];
  const result = await executeQuery(query, parameters);
  return result.rows[0] as BookingDetails | null;
};

export const getBookingByDate = async (date: Date) => {
  const query = `SELECT * FROM "bookings" WHERE "date" = $1`;
  const parameters = [date];
  const result = await executeQuery(query);
  return result.rows[0] as BookingDetails | null;
};


/* // Insert data
export const addbookingData = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO bookings (name, description) VALUES ($1, $2) RETURNING *",
      [name, description]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB Insert Error");
  }
};

// Get data
export const getbookingData = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM services");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB Fetch Error");
  }
}; */