import express from "express";
import { createBooking, getBooking, getBookings, deleteBooking, getBookingByDate } from "../controllers/booking.controller";
import { Request, Response } from "express";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const booking = req.body;
  const createNewBooking = await createBooking(booking);
  res.send(createNewBooking);
});

router.get("/", async (req: Request, res: Response) => {
  const bookings = await getBookings();
  if (bookings === null) {
    res.status(404).send({ error: "bookings not found" });
    return;
  }
  res.send(bookings);
});


router.get("/:id", async (req: Request, res: Response) => {
  const bookings = await getBooking(Number(req.params.id));
  if (bookings === null) {
    res.status(404).send({ error: "booking not found" });
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
