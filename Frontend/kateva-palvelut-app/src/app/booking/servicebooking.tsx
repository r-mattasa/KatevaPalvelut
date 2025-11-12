import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'; // 💡 The main calendar component
import { Paper, Typography, Box, Divider, useTheme } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs'; // Dayjs for date management
import TimeSlotCard from './TimeSlotCard'; // Assuming your card component is here

// --- Dummy Data ---
// In a real app, this data would be fetched based on the selectedDate
const dummyTimeSlots = [
    { time: "19.00", duration: "30 minutes", providerName: "Hassan Bur", providerTitle: "General practitioner", location: "Kamppi Health Center, Helsinki", avatarUrl: "/hassan.jpg" },
    { time: "19.30", duration: "30 minutes", providerName: "Aki Abdi", providerTitle: "General practitioner", location: "Kamppi Health Center, Helsinki", avatarUrl: "/aki.jpg" },
];

const ServiceBookingCalendar: React.FC = () => {
  // State to track the currently selected date
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const theme = useTheme();

  return (
    // 1. Localization Provider Wraps Everything
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper elevation={3} sx={{ p: 3, height:'50%' }}>

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Select Date and Time
        </Typography>

        {/* 2. Date Calendar Component */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <DateCalendar
            value={selectedDate}
            onChange={(newValue) => {
              setSelectedDate(newValue);
              // 💡 Fetch new slots here based on newValue.format('YYYY-MM-DD')
            }}
            // Restrict past dates, etc.
            disablePast
            sx={{ 
                // Removes the outer padding/margin common in pickers
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

        {/* 3. Time Slots List */}
        <Typography variant="h6" sx={{ color: theme.palette.text.primary, mb: 2 }}>
          Available slots on {selectedDate ? selectedDate.format('MMM DD') : 'Selected Date'}
        </Typography>

        <Box maxHeight={400} sx={{ overflowY: 'auto' }}>
          {dummyTimeSlots.map((slot, index) => (
            <TimeSlotCard
              key={index}
              {...slot}
              onSelect={() => console.log(`Selected slot: ${slot.time}`)}
            />
          ))}
          {/* Repeat slots to show scrolling */}
          {dummyTimeSlots.map((slot, index) => (
            <TimeSlotCard
              key={index + 2}
              {...slot}
              onSelect={() => console.log(`Selected slot: ${slot.time}`)}
            />
          ))}
        </Box>

      </Paper>
    </LocalizationProvider>
  );
};

export default ServiceBookingCalendar;