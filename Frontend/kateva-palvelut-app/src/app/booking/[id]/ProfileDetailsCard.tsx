"use client"
import React, { useState } from 'react';
import { Avatar, Box, Card, Typography, Divider,  Stack, useTheme, Collapse, IconButton } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // For the dropdown toggle
import { ProfileDetails } from '../../types/types';

interface ProfileDetailsProps {
  key: number;
  profile: ProfileDetails;
  selectedDate: string
}

interface TimeSlots{
  start_time: string; // e.g., "09:30"
  end_time: string;
  duration: number; 
}

  
const ProfileDetailsCard: React.FC<ProfileDetailsProps> = ({key, profile, selectedDate }) => {
  const theme = useTheme();
  // State for the Bio/Description dropdown (Collapse)
  const [showBioDetails, setShowBioDetails] = useState(false); 
  const [TimeSlotDetails, setTimeSlotsDetails] = useState<TimeSlots[]>([]); 
  const handleToggleBio = () => {
    setShowBioDetails(!showBioDetails);
  };
  const providerId = profile.profile_id;
  console.log("Keyyy", key)
  const apiUrl = `http://localhost:5000/reservation/${providerId}/slots?bookingDate=${selectedDate}`;

// Fetch the data
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    console.log("Available Slots:", data);
    setTimeSlotsDetails(data);
    // data will look like: [{ time: "09:00", duration: 30 }, { time: "09:30", duration: 30 }, ...]
  })
  .catch(error => {
    console.error("Error fetching slots:", error);
  });

  return (
    <Card elevation={3} sx={{ p: 2, m:2 }}>
      
      {/* === 1. TOP SECTION: 2-COLUMN SPLIT === */}
      <Stack direction="row" spacing={2} alignItems="flex-start">
        
        {/* Left Side: Avatar, Name, Title */}
        <Stack direction="column" alignItems="center" spacing={1} sx={{ flexShrink: 0 }}>
          <Avatar 
            alt={profile.name} 
            src={profile.name} 
            sx={{ width: 50, height: 50, border: `3px solid ${theme.palette.primary.main}` }} 
          />
          <Typography variant="body2" fontWeight="600" color="text.secondary" sx={{ textAlign: 'center' }}>
            {profile.name} 
          </Typography>
        
        </Stack>

        {/* Right Side: Quick Bio/Experience Summary */}
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="body1" fontWeight="300" sx={{ color: theme.palette.primary.dark }}>
            {profile.description} 
          </Typography>
        </Box>
      </Stack>

      <Divider sx={{ my: 3 }} />

      {/* === 2. DROPDOWN (COLLAPSE) SECTION === */}
      <Box mb={2} sx={{ cursor: 'pointer' }} onClick={handleToggleBio}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">
              Available time slots
            </Typography>
            <IconButton
              size="small"
              sx={{ 
                transform: showBioDetails ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: theme.transitions.create('transform', {
                  duration: theme.transitions.duration.shortest,
                }),
              }}
            >
              <ExpandMoreIcon />
            </IconButton>
        </Stack>
      </Box>

      {/* The Collapsible Content */}
      <Collapse in={showBioDetails} timeout="auto" unmountOnExit>
        <Box sx={{ p: 2, bgcolor: theme.palette.action.hover, borderRadius: 1 }}>
          {TimeSlotDetails?.map((item, index) => (
            <Typography variant="body2" color="text.primary" key={index}>
                timeslsots {item.start_time} {item.end_time}
            </Typography>
          ))
          }
           
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        {/* 3. Contact & Location Details (Moved down) */}
{/*         <Typography variant="h6" gutterBottom>
          Contact Info
        </Typography>
        <Stack spacing={1}>
          <Box display="flex" alignItems="center"><EmailIcon fontSize="small" color="action" sx={{ mr: 1 }} /><Typography variant="body1">{profile.email}</Typography></Box>
          <Box display="flex" alignItems="center"><PhoneIcon fontSize="small" color="action" sx={{ mr: 1 }} /><Typography variant="body1">{profile.phoneNumber}</Typography></Box>
          <Box display="flex" alignItems="center"><LocationOnIcon fontSize="small" color="action" sx={{ mr: 1 }} /><Typography variant="body1">{profile.location}</Typography></Box>
        </Stack>
         */}
      </Collapse>

      {/* 4. Action Button (Unchanged) */}
{/*       {isOwner && (
        <Button 
          // ... Edit button code
        >
          Edit Profile
        </Button>
      )} */}
    </Card>
  );
};

export default ProfileDetailsCard;