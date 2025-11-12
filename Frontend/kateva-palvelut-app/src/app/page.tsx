"use client";

import { Box, Button, Typography } from "@mui/material";
import ServicesPage from "../../src/app/services/page" 

export default function Home() {
  return (
    <Box
    sx={{
    display: "flex",
    flexDirection:"column",
    justifyContent: "space-between",
    alignItems: "center",
    p: 3,
    m: 4,
    borderBottom: "1px solid #e0e0e0",
  }}>

      <Typography variant="h6" gutterBottom>
        Welcome to Käteväpalvelut
      </Typography>
      <Typography variant="h6" gutterBottom>
        Choose your service category
      </Typography>
      <ServicesPage />
    </Box>
  );
}
