import { Avatar, Box, Card, Typography, IconButton, useTheme } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Define the properties (props) the component accepts
interface TimeSlotCardProps {
  time: string;
  duration: string;
  providerName: string;
  providerTitle: string;
  location: string;
  avatarUrl: string;
  onSelect: () => void;
}

const TimeSlotCard: React.FC<TimeSlotCardProps> = ({
  time,
  duration,
  providerName,
  providerTitle,
  location,
  avatarUrl,
  onSelect,
}) => {
  const theme = useTheme();

  return (
    // The outer Card provides the interactive, clickable background
    <Card 
      variant="outlined"
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        p: 2, 
        mb: 2, 
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        '&:hover': {
          backgroundColor: theme.palette.action.hover, // Provides visual feedback on hover
        },
      }}
      onClick={onSelect}
    >
      
      {/* Time Block (Left side: 19.00 / 30 minutes) */}
      <Box sx={{ 
        width: '100px', 
        textAlign: 'center', 
        mr: 3, 
        flexShrink: 0 
      }}>
        <Typography 
          variant="h5" 
          fontWeight="bold" 
          sx={{ color: theme.palette.primary.main }} 
        >
          {time}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary"
        >
          {duration}
        </Typography>
      </Box>

      {/* Provider Info (Center) */}
      <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
        <Avatar alt={providerName} src={avatarUrl} sx={{ width: 48, height: 48, mr: 2 }} />
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            {providerName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {providerTitle}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
            {/* Simple Map Pin Icon (using SVG for portability, you can replace with a MUI Icon) */}
            <svg style={{ width: 16, height: 16, marginRight: 4, color: theme.palette.text.secondary }} viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <Typography variant="caption" color="text.secondary">
              {location}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Action Icon (Right side) */}
      <IconButton aria-label={`Select ${time} slot`}>
        <ArrowForwardIosIcon fontSize="small" />
      </IconButton>
    </Card>
  );
};

export default TimeSlotCard;