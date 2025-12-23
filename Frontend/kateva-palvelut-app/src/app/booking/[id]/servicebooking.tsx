"use client";
import React, { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Paper, Typography, Box, Divider } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';

// Define the required date format (using Dayjs format string)
const DATE_FORMAT = "YYYY-MM-DD"; 

interface ServiceBookingCalendarProps {
  // This prop communicates the selected date string to the component that renders ProfileDetailsList
  onDateChange: (date: string) => void; 
}

const ServiceBookingCalendar: React.FC<ServiceBookingCalendarProps> = ({ onDateChange }) => {
  
  // 1. STATE: Initialize selectedDate with TODAY's date, wrapped in dayjs
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

  // 2. INITIAL FETCH: Use useEffect to run once after mount
  useEffect(() => {
    // Check if selectedDate has an initial value (it should, as we initialized it)
    if (selectedDate) {
      // 💡 Send the formatted current date string to the parent component on mount
      onDateChange(selectedDate.format(DATE_FORMAT));
    }
    // Dependency array is empty, so this only runs once on mount.
  }, []); 

  const handleDateChange = (newValue: Dayjs | null) => {
    // 3. Update the internal state for the calendar display
    setSelectedDate(newValue);
    
    // 4. Send the new date string to the parent component immediately on change
    if (newValue) {
      onDateChange(newValue.format(DATE_FORMAT)); 
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Select Date and Time
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <DateCalendar
            value={selectedDate}
            onChange={handleDateChange} // Use the dedicated handler
            disablePast
            sx={{ 
              maxWidth: '100%', 
              '& .MuiPickersCalendarHeader-root': {
                paddingTop: 0,
              },
              '& .MuiPickersCalendar-root': {
                minHeight: 300, 
              }
            }}
          />
        </Box>
        <Divider sx={{ my: 2 }} />
      </Paper>
    </LocalizationProvider>
  );
};

export default ServiceBookingCalendar;