import React from "react";
import { Box, Typography, Avatar,  useTheme,  Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useRouter } from 'next/navigation';
import { AppointmentSlotProps } from "@/app/types/types";


const AppointmentSlot: React.FC<AppointmentSlotProps> = (props) => {
  const theme = useTheme();

  const router = useRouter(); 
  
  const handleBookingClick = () => {
    const donePageUrl = `/confirmation`;
    
    // All required data is accessed directly from the props object
    const queryParams = new URLSearchParams({
      profileId: props.profileId ? props.profileId.toString() : '',
      description: props.description,
      subServiceId: props.subserviceId ? props.subserviceId.toString() : '',
      slotStartTime: props.start_time,
      slotEndTime: props.end_time,
      slotDuration: props.duration, 
      providerName: props.name,
      bookingDate: props.booking_date
    }).toString();

    router.push(`${donePageUrl}?${queryParams}`);
  };


  return (
    
        <Grid container spacing={4} alignItems="center" sx={{ boxShadow: 2, borderRadius: 1, m: 1 }} key={props.start_time}>
          {/* 1. Time Slot */}
          <Grid size={{ xs: 2 }}  sx={{ textAlign: "center" }}>
            <Box sx={{ p: 1, m: 1, borderRadius: 1, backgroundColor: "#ffffff", color: "#1565c0" }}>
              <Typography variant="body2" fontWeight="600">
                {props.start_time}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ m: 0.5, color: "#5e9de6ff" }}>
                {props.duration} Minutes
              </Typography>
            </Box>
          </Grid>

          {/* 2. Divider */}
          <Box sx={{ width: "1px", height: "80px", backgroundColor: "#e0e0e0", mx: 1 }} />

          {/* 3. Profile Details */}
          <Grid size={{ xs: 8.5 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                alt={props.name}
                src={props.name}
                sx={{ mr: 2, width: 48, height: 48, border: `3px solid ${theme.palette.primary.main}` }}
              />
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  {props.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {props.description}
                </Typography>
                <Button onClick={handleBookingClick}  variant="contained" color="primary"   sx={{ m: 1 }}>Book Time </Button>
                
                {/*  <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
              <PlaceIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
              <Typography variant="body2" color="text.secondary">{location}</Typography>
            </Box> */}
              </Box>
            </Box>
          </Grid>

          {/* 4. Arrow/Action Button */}
        </Grid>
  );
};
export default AppointmentSlot;
