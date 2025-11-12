"use client";

import { Box, Typography, Button, Stack, useTheme } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

interface ConfirmationProps {
  isLoggedIn: boolean;
  freelancerName: string; 
}

const ReservationConfirmation: React.FC<ConfirmationProps> = (props: ConfirmationProps) => {
  const theme = useTheme();

  return (
    <Box 
      sx={{ 
        textAlign: 'center', 
        p: 4, 
        border: `2px solid ${theme.palette.success.main}`, 
        borderRadius: 2,
        bgcolor: theme.palette.success.light + '10', // Light background tint
        alignItems: "center"
      }}
    >
      {/* Success Message */}
      <CheckCircleIcon sx={{ fontSize: 60, color: theme.palette.success.main, mb: 2 }} />
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Reservation Confirmed!
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" mb={4}>
        Your appointment with {props.freelancerName} is booked. You will receive an email confirmation shortly.
      </Typography>

      <Stack 
        direction={{ xs: 'column', sm: 'row' }} // Stack vertically on mobile, horizontally on desktop
        spacing={2} 
        justifyContent="center"
      >
        {props.isLoggedIn ? (
          // === Logged-in User CTAs ===
          <>
            <Button 
              variant="outlined"
              onClick={() => console.log('Go to Booking History')}
              size="large"
            >
              View All Bookings
            </Button>
          </>
        ) : (
          // === Guest User CTAs ===
          <>
            <Button 
              variant="contained" 
              color="secondary" // Use a strong contrasting color for Registration
              startIcon={<PersonAddIcon />}
              onClick={() => console.log('Go to Registration Page')}
              size="large"
            >
              **Create a Free Account**
            </Button>
            <Button 
              variant="outlined"
              onClick={() => console.log('Continue as Guest / View Booking ID')}
              size="large"
            >
              Back to Services
            </Button>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default ReservationConfirmation;