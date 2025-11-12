"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import BookingConfirmationForm from "./booking-confirmation-form";
import { useSearchParams } from 'next/navigation';
import { BookingProps } from "../types/types";


const ReservationConfirmationPage: React.FC = () => {
   const params = useSearchParams(); 
   console.log("Parsms...", params);
   const reservationProps: BookingProps = {
         profileId: params.get('profileId'),
         description: params.get('description'),
         subServiceId: Number(params.get('subServiceId')),
         slotStartTime: params.get('slotStartTime'),
         slotEndTime: params.get('slotEndTime'),
         slotDuration: Number(params.get('slotDuration')),
         providerName: params.get('providerName'),
         bookingDate:params.get('bookingDate')
    };
  return (
    <Box sx={{ py: 4, mt:6, boxShadow: 3, borderRadius: 0, backgroundColor:'#ffffff', textAlign:'center' }}>

      <Grid container spacing={2} alignItems="stretch">
       <BookingConfirmationForm {...reservationProps} />
      </Grid>
    </Box>
  );
}

export default ReservationConfirmationPage;