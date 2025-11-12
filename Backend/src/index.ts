import express, { Request, Response } from "express";
import cors from "cors";
import serviceroutes from "./routes/services.routes";
import subserviceroutes from "./routes/subservices.routes";
import profileroutes from "./routes/profile.routes";
import bookingroutes from "./routes/booking.routes";
import customerroutes from "./routes/customer.routes";
import reservationroutes from "./routes/reservation.routes";
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

/* app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Welcome to Kätevä Palvelut!");
}); */

app.use("/services", serviceroutes);
app.use("/subservices", subserviceroutes);
app.use("/profiles", profileroutes);
app.use("/bookings", bookingroutes);
app.use("/customers", customerroutes);
app.use("/reservation", reservationroutes);
app.use("/reservation/book-appointment", reservationroutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
