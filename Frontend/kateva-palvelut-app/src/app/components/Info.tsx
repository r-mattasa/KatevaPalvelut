
import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        textAlign: 'center',
        backgroundColor: 'secondary',
        color: 'white',
        mt: 'auto',
      }}
    >
      <Typography variant="body2">
       Welcome to Kätevä palvelut
      </Typography>
    </Box>
  );
}
