"use client";

import { Box, Typography, useTheme } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { ConfirmationProps } from "../types/types";

const ReservationConfirmation: React.FC<ConfirmationProps> = (props: ConfirmationProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        textAlign: "center",
        p: 2,
        m: 2,
        borderRadius: 2,
        alignItems: "center",
        minHeight: "50vh",
        width: "100%",
      }}
    >
      {/* Success Message */}
      <CheckCircleIcon sx={{ fontSize: 30, color: theme.palette.secondary.dark, mb: 2 }} />
      <Typography variant="h6" fontWeight="bold">
        Reservation Confirmed!
      </Typography>
      <Typography variant="h6" fontWeight="bold">
        Your appointment with {props.freelancerName} is booked.
      </Typography>
      <Typography variant="h6" fontWeight="bold">
        Your bookingId is : {props.bookingId}
      </Typography>
      <Typography variant="h6" mb={4}>
        Your appointment at{" "}
        <Box component="span" color="secondary.dark" fontWeight="bold">
          {props.startTime} {props.bookingDate}
        </Box>{" "}
        that takes about 45 minutes of time.
      </Typography>
      <Typography variant="h6" color="theme.palette.secondary.dark" mb={4} sx={{ p: 1 }}>
        You will receive an email confirmation shortly.
      </Typography>
    </Box>
  );
};

export default ReservationConfirmation;
