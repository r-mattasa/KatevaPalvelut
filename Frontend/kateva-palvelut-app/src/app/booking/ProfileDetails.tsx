import React, { useState } from 'react';
import { Avatar, Box, Card, Typography, Divider, Button, Stack, useTheme, Collapse, IconButton } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // For the dropdown toggle

// Assuming IProfile structure from previous steps
interface IProfile {
  name: string;
  email: string;
  phoneNumber: string; 
  active: boolean; 
  title: string;
  location: string;
  avatarUrl: string;
  bio: string;
  yearsOfExperience: number; // Added for the description
}

interface ProfileDetailsProps {
  profile: IProfile;
  isOwner: boolean; 
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ profile, isOwner }) => {
  const theme = useTheme();
  // State for the Bio/Description dropdown (Collapse)
  const [showBioDetails, setShowBioDetails] = useState(false); 
  
  const handleToggleBio = () => {
    setShowBioDetails(!showBioDetails);
  };

  return (
    <Card elevation={3} sx={{ p: 4, height: '100%' }}>
      
      {/* === 1. TOP SECTION: 2-COLUMN SPLIT === */}
      <Stack direction="row" spacing={3} alignItems="flex-start">
        
        {/* Left Side: Avatar, Name, Title */}
        <Stack direction="column" alignItems="center" spacing={1} sx={{ flexShrink: 0 }}>
          <Avatar 
            alt={profile.name} 
            src={profile.avatarUrl} 
            sx={{ width: 80, height: 80, border: `3px solid ${theme.palette.primary.main}` }} 
          />
          <Typography variant="h6" fontWeight="bold" sx={{ textAlign: 'center' }}>
            {profile.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
            {profile.title}
          </Typography>
        </Stack>

        {/* Right Side: Quick Bio/Experience Summary */}
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" gutterBottom>
            Key Experience
          </Typography>
          <Typography variant="body1" fontWeight="bold" sx={{ color: theme.palette.primary.dark }}>
            {profile.yearsOfExperience} Years Experience
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            {profile.bio.substring(0, 70)}... {/* Show a snippet */}
          </Typography>
        </Box>
      </Stack>

      <Divider sx={{ my: 3 }} />

      {/* === 2. DROPDOWN (COLLAPSE) SECTION === */}
      <Box mb={2} sx={{ cursor: 'pointer' }} onClick={handleToggleBio}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">
              Full Bio & Services
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
            <Typography variant="body2" color="text.primary" paragraph>
                {profile.bio}
            </Typography>
            <Typography variant="body2" fontWeight="bold">
                Detailed Service List:
            </Typography>
            {/* Example: List of services */}
            <ul>
                <li>General Consultation (30 min)</li>
                <li>Preventative Care Check-up (60 min)</li>
            </ul>
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

export default ProfileDetails;