"use client";
import { Container, Grid} from '@mui/material';
import ServiceBookingCalendar from "../[id]/servicebooking";
import { ProfileDetails } from '../../types/types';
import axios from 'axios';
import React, { useState } from 'react';
import { ProfileDetailsList } from './ProfileDetailsList';
import { useParams } from 'next/navigation';
// Import other MUI components like Card, Avatar, Button, etc.
// Import your custom components (Header, ProfileDetails, CalendarComponent)

const ServiceProfileAndCalendarPage = () => {
  // Assume isOwner is determined by Next.js session/auth checks
  const params = useParams();
  const subserviceId = Number(params.id);
  const [profiles, setProfiles] = useState<ProfileDetails[]>([]);
  const [selectedDate, setSelectedDate] = useState('');

  const fetchAvailableProfiles = async (date: string) => {
    setSelectedDate(date);
    const response = await axios.get("http://localhost:5000/reservation", {
      params: { booking_date: date, subservice_id: subserviceId }
    });
    setProfiles(response.data);
  };

  return (
    // Next.js automatically includes your Header in _app.tsx or as a layout
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, minHeight:'100vh' }}>
      <Grid container spacing={4} gap={2}>
        {/* === LEFT COLUMN: PROFILE === */}
         <Grid size={{ xs: 12, sm: 6, md: 4 }} >
          <ServiceBookingCalendar onDateChange={fetchAvailableProfiles}  />
        </Grid>
        {/* === RIGHT COLUMN: CALENDAR === */}
          <Grid size={{ xs: 12, md: 8 }}>
            <ProfileDetailsList profiles={profiles} BookingDate={selectedDate} subService={subserviceId}  />
        </Grid>
   </Grid>
  </Container>
  );
};

export default ServiceProfileAndCalendarPage;