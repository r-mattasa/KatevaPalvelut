import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#2b0225ff' },
    secondary: { main: '#9c27b0' },
    background: { default: '#f0f0f0' },
  },
  typography: {
    fontFamily: `'Inter', sans-serif`,
  },
});

export default theme;
