"use client";

import { Box, Typography } from "@mui/material";
import Link from "next/link";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import LanRoundedIcon from "@mui/icons-material/LanRounded";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";

export default function Navigation() {
  return (
   
<Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    py: 3,
    borderBottom: "1px solid #e0e0e0",
  }}
>
  {[
    { label: "Services", to:"services", icon: <LanRoundedIcon />, active: true },
    { label: "SubServices", to:"subservices", icon: <DisplaySettingsIcon /> },
    { label: "Reserve",to:"booking",icon: <CalendarMonthOutlinedIcon /> },
    { label: "Done",to:"confirmation", icon: <CheckCircleOutlinedIcon /> },
  ].map((item, index) => (
    <Box
      key={index}
      sx={{
        flex: 1,
        textAlign: "center",
        color: item.active ? "#580856b2" : "#9E9E9E",
      }}
    >
      <Box sx={{ fontSize: 32 }}component={Link}
              href={`/${item.to}`}>{item.icon}</Box>
      <Typography
        variant="body2"
        sx={{
          mt: 1,
          fontWeight: item.active ? 600 : 400,
        }}
      >
        {item.label}
      </Typography>
    </Box>
  ))}
</Box>
  );
}
