
import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        textAlign: 'center',
        backgroundColor: 'primary.main',
        color: 'white',
        mt: 'auto',
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Kätevä palvelut — All Rights Reserved
      </Typography>
    </Box>
  );
}
