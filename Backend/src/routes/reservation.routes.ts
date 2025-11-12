import express from "express";
import { createBooking, getBooking, getBookings, deleteBooking } from "../controllers/booking.controller";
import { createCustomer, getcustomers, getCustomerByEmail } from "../controllers/customer.controller";
import { Request, Response } from "express";
import { getBookingsByDate, getAvailableTimeSlots } from "../controllers/reservation.controller";
import { AvailableSlotQuery, AvailableSlot, RequestBody, CustomerPayload, BookingPayload } from "../type/types";
import { sendBookingConfirmationEmail } from "../controllers/reservation.controller";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const profile = req.body;
  /* if(profile.customer_id){ */
  // const newCustomer = await createCustomer(profile);
  const createdProfile = await createBooking(profile);
  res.send(createdProfile);
  /* } */
});

/****************Book apppointment***************** */
router.post("/book-appointment", async (req: Request<{}, {}, RequestBody>, res: Response) => {
  try {
    const { customer, booking } = req.body;

    // 1. Basic Validation
    if (!customer.email || !booking.profileId || !booking.slotStartTime) {
      return res.status(400).json({ message: "Missing required booking data." });
    }

    let customerId: number;

    // 2. Conditional Customer Insertion/Retrieval (Delegated to Controller)
    const existingCustomer = await getCustomerByEmail(customer.email);

    if (existingCustomer) {
      customerId = existingCustomer.customer_id;
    } else {
      // if the customer is NEW: create the customer and get the new ID
      const newCustomer = await createCustomer({
        name: `${customer.firstName} ${customer.lastName}`,
        email: customer.email,
        phone_number: customer.phoneNumber,
        notes: customer.notes,
        is_registerd_member: customer.is_registerd_member,
      });
      customerId = newCustomer.customer_id;
    }

    // 3. Create new booking Record (Delegated to Controller)
    const bookingRecord = {
      providerProfileId: booking.profileId,
      subservice_id: booking.subServiceId,
      customer_id: customerId.toString(),
      total_hours: booking.slotDuration,
      duration: booking.slotDuration,
      provider_profile_id: booking.profileId,
      booking_date: booking.bookingDate,
      start_time: `${booking.bookingDate} ${booking.slotStartTime}`,
      end_time: `${booking.bookingDate} ${booking.slotEndTime}`,
    };
    const newBooking = await createBooking(bookingRecord);

    //5. Sucess Email¨
/*     try {
      await sendBookingConfirmationEmail(customer.email, customer.firstName, newBooking.booking_id);
    } catch (emailError) {
      console.error("Failed to send booking confirmation email:", emailError);
      // Optional: continue without failing the booking
    } */

    // 4. Success responses
    return res.status(201).json({
      message: "Booking successfully confirmed.",
      bookingId: newBooking.booking_id,
    });
  } catch (error) {
    console.error("Booking processing error:", error);
    // Important: If a database error occurs (e.g., failed insert), it's caught here.
    return res.status(500).json({ message: "Internal Server Error. Booking failed." });
  }
});

/*****************send email*************** */

/* router.post("/sendEmail", async (req, res) => {
  const { email, name, bookingId } = req.body;

  try {
    // Send email
    await sendEmailNotification(email, name, bookingId);

    return res.json({ success: true, message: "User registered & email sent!" });
  } catch (error) {
    console.error("Registration/email error:", error);
    return res.status(500).json({ success: false, error: "Failed to register or send email" });
  }
}); */

router.get("/", async (req: Request, res: Response) => {
  const { booking_date, subservice_id } = req.query;
  console.log("Filters:", booking_date, subservice_id);

  const dateRequested = req.params.booking_date;
  // const subservice_id  = req.params.subservice_id;

  /* if(dateRequested) { */
  const availiabieProfiles = await getBookingsByDate(String(booking_date), Number(subservice_id));
  res.send(availiabieProfiles);
  /* } */
  /*   if (bookings === null) {
    res.status(404).send({ error: "bookings not found" });
    return;
  }
  res.send(bookings); */
});

router.get(
  "/:providerId/slots",
  async (
    // Keep the generic parameter for query definition
    req: Request<{ providerId: string }, {}, {}, AvailableSlotQuery>,
    res: Response<AvailableSlot[] | { message: string }>
  ) => {
    const providerId = Number(req.params.providerId);
    const dateRequested = req.query.bookingDate as String;

    // console.log('Filters:', providerId, 'Date:', dateRequested);

    if (isNaN(providerId) || !dateRequested || typeof dateRequested !== "string") {
      return res.status(400).json({ message: "Invalid providerId or missing date." });
    }

    const availableSlots = await getAvailableTimeSlots(providerId, dateRequested);

    if (!availableSlots) {
      return res.status(500).json({ message: "Internal server error during slot retrieval." });
    }

    res.status(200).send(availableSlots);
  }
);

router.get("/:id", async (req: Request, res: Response) => {
  const bookings = await getBooking(Number(req.params.id));
  if (bookings === null) {
    res.status(404).send({ error: "booking not found" });
    return;
  }
  res.send(bookings);
});

router.get("/:date", async (req: Request, res: Response) => {
  const bookings = await getBooking(Number(req.params.date));
  if (bookings === null) {
    res.status(404).send({ error: "bookings not found" });
    return;
  }
  res.send(bookings);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const bookings = await deleteBooking(Number(req.params.id));
  if (bookings === null) {
    res.status(404).send({ error: "bookings not found" });
    return;
  }
  res.send(bookings);
});

export default router;
