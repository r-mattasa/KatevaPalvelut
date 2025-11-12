"use  client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ReservationConfirmation from "./reservation-confirmation";
import BookingConfirmationForm from "./booking-confirmation-form";
import { ConfirmationProps } from "../types/types";

const cprops: ConfirmationProps = {
freelancerName: "Reena",
isLoggedIn: true
};

const ReservationConfirmationPage: React.FC = () => {
  return (
    <Box sx={{ py: 4 }}>
      <Grid container spacing={2} alignItems="stretch">
       <BookingConfirmationForm />
       <ReservationConfirmation {...cprops} />
      </Grid>
    </Box>
  );
}

export default ReservationConfirmationPage;