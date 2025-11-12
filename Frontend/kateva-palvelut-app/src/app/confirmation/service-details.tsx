"use client";

import { Box, Typography, Divider, Paper, useTheme, Grid } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { AppointmentSlotProps } from "@/app/types/types";


const ServiceDetails: React.FC<AppointmentSlotProps> = (props:AppointmentSlotProps) => {

  return (
    <Box 
      sx={{ 
        textAlign: 'center', 
        p: 4, 
        bgcolor: '#FFFFFF', 
      }}
    >

    <Paper sx={{ p: 4, maxWidth: 600, margin: 'auto', boxShadow: 1 }}>
      
      <Box sx={{ pb: 2 }}>
        {/* Aika (Time/Date) */}
         <Grid  size={{ xs:8}}>
      <Typography 
        variant="body2" 
        fontWeight={'regular'}
      >
        Duration: {props.duration}
      </Typography>
    </Grid>

        <Divider sx={{ my: 1 }} />

            {/* Value (Date, Service Name, etc.) - Aligned to the left */}
    <Grid  size={{ xs:8}}>
      <Typography 
        variant="body2" 
        fontWeight={'regular'}
      >
        Start: {props.start_time}
      </Typography>
    </Grid>

        
        
        <Divider sx={{ my: 1 }} />


             <Divider sx={{ my: 1 }} />
        
        {/* Työntekijät (Employee) */}
     
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PersonIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
              <Typography variant="body2">Name: {props.name}</Typography>
            </Box>
      </Box>
    </Paper>

 
    </Box>
  );
};

export default ServiceDetails;