"use client";

import {
  Box,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
  Stack,
  useTheme,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import { BookingProps, ConfirmationProps } from "../types/types";
import ReservationConfirmation from "./reservation-confirmation";
import { useRouter } from "next/navigation";

interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  message: string;
  acceptTerms: boolean;
  marketingEmail: boolean;
  marketingText: boolean;
}

const BookingConfirmationForm: React.FC<BookingProps> = (props) => {
  const theme = useTheme();
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    message: "",
    acceptTerms: false,
    marketingEmail: false,
    marketingText: false,
  });
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [successBookingId, setSuccessBookingId] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const getConfirmationProps = (): ConfirmationProps => ({
    freelancerName: props.providerName || "Service Provider",
    bookingDate: props.bookingDate,
    startTime: props.slotStartTime,
    duration: Number(props.slotDuration),
    isLoggedIn: true,
    serviceName: props.subServiceName ? props.subServiceName.toString() : "",
    bookingId: successBookingId,
  });

  const handleConfirmedBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.acceptTerms) {
      alert("You must accept the terms to confirm the booking.");
      return;
    }
    const payload = {
      customer: formData, // get data from the form inputs
      booking: props, // get data from URLSearchParams
    };
    try {
      const response = await fetch("http://localhost:5000/reservation/book-appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const responseData = await response.json();
        setIsConfirmed(true);
        setSuccessBookingId(responseData.bookingId);
      } else {
        const errorData = await response.json();
        console.error("API Booking Failed:", errorData.message);
        alert(`Booking Failed: ${errorData.message}`);
        return false;
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  if (isConfirmed) {
    return (
      // You might want to wrap this in a Grid item to match your overall layout
      <Box sx={{ width: "100%", alignItems: "center", textAlign: "center" }}>
        <ReservationConfirmation {...getConfirmationProps()} />
      </Box>
    );
  }

  return (
    <Box
      component="form"
      onSubmit={handleConfirmedBooking}
      sx={{
        p: 4,
        maxWidth: 600,
        mx: "auto",
        boxShadow: 3,
      }}
    >
      <Stack
        spacing={3}
        sx={{
          p: 4,
          boxShadow: 1,
        }}
      >
        <Box>
          <Typography variant="subtitle1" color="#726475ff">
            Booking Date : {props.bookingDate}
          </Typography>
          <Typography variant="subtitle1" color="#726475ff">
            TimeSlot: {props.slotStartTime} - {props.slotEndTime}
          </Typography>
          <Typography variant="subtitle1" color="#726475ff">
            Service : {props.subServiceName}
          </Typography>
        </Box>
      </Stack>
      <Divider sx={{ my: 1 }} />
      <Typography variant="h6" color="#9928a3ff" fontWeight="bold" margin={1} padding={1}>
        Verify and Finalize your Booking
      </Typography>
      <Stack spacing={3}>
        {/* First Name */}
        <TextField
          label="First name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          fullWidth
        />

        {/* Last Name */}
        <TextField
          label="Last name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          fullWidth
        />

        {/* Telephone Number (with flag - requires custom input or a specialized library for the flag/dropdown) */}
        {/* For simplicity, we use a standard TextField here: */}
        <TextField
          label="Telephone number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          fullWidth
          // Use inputProps for pattern matching if needed
        />

        {/* E-mail address */}
        <TextField
          label="E-mail address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          fullWidth
        />

        <Divider sx={{ my: 1 }} />

        {/* Message to employee (optional) */}
        <TextField
          label="Message to employee (optional)"
          name="message"
          value={formData.message}
          onChange={handleChange}
          multiline
          rows={3}
          fullWidth
        />

        <Divider sx={{ my: 1 }} />

        {/* Terms and Conditions Checkbox */}
        <FormControlLabel
          control={<Checkbox name="acceptTerms" checked={formData.acceptTerms} onChange={handleChange} required />}
          label={
            <Typography variant="body2">
              I accept KatevaPalvelut{" "}
              <a href="#" style={{ color: theme.palette.primary.main }}>
                terms of use and cancellation
              </a>
              , as well as{" "}
              <a href="#" style={{ color: theme.palette.primary.main }}>
                its privacy policy.
              </a>
            </Typography>
          }
        />

        <Divider sx={{ my: 1 }} />

        {/* Confirm Booking Button */}
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={!formData.acceptTerms} // Button disabled until terms are accepted
          sx={{ py: 1.5, mt: 3, bgcolor: theme.palette.secondary.main }} // Use info color for the distinct blue
        >
          Confirm booking
        </Button>

        <Button variant="text" color="inherit" onClick={() => router.back()}>
          CANCEL / GO BACK TO CHANGE
        </Button>
      </Stack>
    </Box>
  );
};

export default BookingConfirmationForm;
