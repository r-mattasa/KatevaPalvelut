"use client";
import { Container, Grid} from '@mui/material';
import ServiceBookingCalendar from "./servicebooking";
import ProfileDetails from "./ProfileDetails";
import { IProfile } from '../types/types';
// Import other MUI components like Card, Avatar, Button, etc.
// Import your custom components (Header, ProfileDetails, CalendarComponent)

const dummyProfile: IProfile = {
  name: "Hassan Bur",
  email: "hassan@example.com",
  phoneNumber: "+358 50 123 4567",
  active: true,
  title: "General practitioner, MD",
  location: "Kamppi Health Center, Helsinki",
  avatarUrl: "/images/hassan.jpg", // Replace with actual path
  bio: "Dedicated medical professional with 5 years of experience in primary care, focusing on holistic patient wellness and health education.",
  yearsOfExperience: 5
};

const ServiceProfileAndCalendarPage: React.FC = () => {
  // Assume isOwner is determined by Next.js session/auth checks
  const isProfileOwner = true;
  return (
    // Next.js automatically includes your Header in _app.tsx or as a layout
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={4} gap={2}>
        {/* === LEFT COLUMN: PROFILE === */}
         <Grid size={{ xs: 12, sm: 6, md: 4 }} >
          <ServiceBookingCalendar />
        </Grid>
        {/* === RIGHT COLUMN: CALENDAR === */}
          <Grid size={{ xs: 12, md: 8 }}>
            <ProfileDetails profile={dummyProfile} isOwner={isProfileOwner} />
        </Grid>
   </Grid>
    </Container>
  );
};

export default ServiceProfileAndCalendarPage;