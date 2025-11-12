"use client";

import { Box, TextField, Typography, Checkbox, FormControlLabel, Button, Stack, useTheme, Divider } from "@mui/material";
import React, { useState } from "react";

// You would define a more robust type for form data in a real app
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

const BookingConfirmationForm: React.FC = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    message: '',
    acceptTerms: false,
    marketingEmail: false,
    marketingText: false,
  });
  
  // Basic change handler for all fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.acceptTerms) {
      alert("You must accept the terms to confirm the booking.");
      return;
    }
    console.log("Submitting Booking:", formData);
    // 💡 Here you would call your API to finalize the reservation
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      sx={{ 
        p: 4, 
        maxWidth: 600, 
        mx: 'auto' 
      }}
    >
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
          control={
            <Checkbox 
              name="acceptTerms" 
              checked={formData.acceptTerms} 
              onChange={handleChange} 
              required
            />
          }
          label={
            <Typography variant="body2">
              I accept booksalos <a href="#" style={{ color: theme.palette.primary.main }}>terms of use and cancellation</a>, as well as <a href="#" style={{ color: theme.palette.primary.main }}>its privacy policy.</a>
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
          sx={{ py: 1.5, mt: 3, bgcolor: theme.palette.info.main }} // Use info color for the distinct blue
        >
          Confirm booking
        </Button>
        
        <Button variant="text" color="inherit" onClick={() => console.log('Cancel clicked')}>
            CANCEL
        </Button>
      </Stack>
    </Box>
  );
};

export default BookingConfirmationForm;