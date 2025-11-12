import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#2b0225ff' },
    secondary: { main: '#9c27b0' },
    background: { default: '#f9fafb' },
  },
  typography: {
    fontFamily: `'Inter', sans-serif`,
  },
});

export default theme;
