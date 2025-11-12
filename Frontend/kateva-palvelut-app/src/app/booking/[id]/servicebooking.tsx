"use client";
import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'; // 💡 The main calendar component
import { Paper, Typography, Box, Divider, useTheme } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs'; // Dayjs for date management

// --- Dummy Data ---


interface ServiceBookingCalendarProps {
  onDateChange: (date: string) => void;
}


const ServiceBookingCalendar: React.FC<ServiceBookingCalendarProps> = ( {onDateChange}) => {
  // State to track the currently selected date
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const theme = useTheme();

  const handleDateChange = (newValue: Dayjs | null) => {
  setSelectedDate(newValue);
  if (newValue) {
     onDateChange(newValue.format("YYYY-MM-DD")); // send formatted date to parent
  }
};

  return (
   
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper elevation={3} sx={{ p: 3 }}>

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Select Date and Time
        </Typography>

        {/* Date Calendar Component */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <DateCalendar
            value={selectedDate}
             onChange={(e) => handleDateChange(e)}
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