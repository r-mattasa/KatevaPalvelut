import { pool } from "../db_config/db";
import type { BookingDetails, ProviderProfile, AvailableSlot } from "../type/types";
import { executeQuery } from "../db_config/db";
import { QueryResult } from "pg"; // Import Pool and QueryResult
import { AvailableSlotQuery } from "../type/types";
import { getProfile } from "./profile.controller";
import nodemailer from "nodemailer";


const SLOT_DURATION_MINUTES = 45;

export const createBooking = async (booking: BookingDetails) => {
  console.log("bookings", booking);
  const query = `INSERT INTO "bookings" ("subservice_id", "customer_id", "provider_profile_id", "booking_status", "booking_date", "start_time", "end_time", "total_hours") VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
  const parameters = [
    booking.subservice_id,
    booking.customer_id,
    booking.provider_profile_id,
    booking.booking_status,
    booking.booking_date,
    booking.start_time,
    booking.end_time,
    booking.total_hours,
  ];
  const result = await executeQuery(query, parameters);
  return result.rows[0] as BookingDetails;
};

export const getBookings = async () => {
  const query = `SELECT * FROM "bookings" `;
  const result = await executeQuery(query);
  return result.rows as BookingDetails[] | null;
};

export const getBookingsByDate = async (booking_date: string, subservice_id: number) => {
  console.log("getbookings done");
  const parameters = [booking_date, subservice_id];
  console.log("paramters", parameters);
  try {
    const query = `
            SELECT p.*
FROM service_provider_profiles p
WHERE p.subservice_id = $1 `;

    const result = await pool.query(query, [subservice_id]);
    return result.rows as ProviderProfile[];
  } catch (err) {
    console.error(err);
    // return res.status(500).json({ error: "Server error" });
  }
};

export const getAvailableTimeSlots = async (
  providerId: number,
  bookingDate: string
): Promise<{ start_time: string; end_time: string; duration: number }[] | { message: string }> => {
  try {
    const query = `
    WITH booked_slots AS (
        SELECT start_time::time AS start_time, end_time::time AS end_time
        FROM bookings
        WHERE provider_profile_id = $1
        AND booking_date = TO_DATE($2, 'YYYY-MM-DD')
    ),
    all_slots AS (
        SELECT generate_series(
            TO_TIMESTAMP($2 || ' 09:00', 'YYYY-MM-DD HH24:MI'),
            TO_TIMESTAMP($2 || ' 17:00', 'YYYY-MM-DD HH24:MI') - interval '45 minutes',
            interval '45 minutes'
        ) AS slot_start
    )
    SELECT 
        slot_start::time AS start_time,
        (slot_start + interval '45 minutes')::time AS end_time,
        45 AS duration
    FROM all_slots
    WHERE NOT EXISTS (
        SELECT 1
        FROM booked_slots b
        WHERE slot_start::time < b.end_time
        AND (slot_start + interval '45 minutes')::time > b.start_time
    )
    ORDER BY start_time;
    `;

    const result = await pool.query(query, [providerId, bookingDate]);
    console.log(result);
    return result.rows;
  } catch (err) {
    console.error("Slot query error:", err);
    return { message: "Internal server error" };
  }
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.KP_EMAIL_USER,
    pass: process.env.KP_EMAIL_PASS, // app password
  },
});


export const sendBookingConfirmationEmail = async (to:string, name:string, bookingId:string) => {
 const mailOptions = {
    from: `"My MVP App" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Welcome to MVP App!",
    text: `Hi ${name}, thanks for registering with Katevä Palvelut - your booking Id is ${bookingId}  .`,
  };

  await transporter.sendMail(mailOptions);
};

