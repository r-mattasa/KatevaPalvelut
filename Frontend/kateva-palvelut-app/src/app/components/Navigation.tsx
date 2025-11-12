"use client";

import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import LanRoundedIcon from "@mui/icons-material/LanRounded";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import type { SvgIconTypeMap } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";

// Define the structure for a navigation item using a TypeScript interface
interface NavItem {
  label: string;
  to: string; // Should be the full route path, e.g., "/services"
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  icon: React.ReactElement<OverridableComponent<SvgIconTypeMap<{}, "svg">>>;
}

// Define the component props
interface NavigationProps {
  currentStepIndex: number;
}

// Define the navigation items array
const NAV_ITEMS: NavItem[] = [
  { label: "Services", to: "/services", icon: <LanRoundedIcon /> },
  { label: "SubServices", to: "/subservices", icon: <DisplaySettingsIcon /> },
  { label: "Reserve", to: "/booking", icon: <CalendarMonthOutlinedIcon /> },
  { label: "Done", to: "/confirmation", icon: <CheckCircleOutlinedIcon /> },
];

export default function Navigation({ currentStepIndex = 0 }: NavigationProps) {
  // Get the current URL path from Next.js
  const pathname = usePathname();

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
      {NAV_ITEMS.map((item, index) => {
        // 1. Determine active state (pathname starts with the item's path)
        const isActive = pathname.startsWith(item.to);
        
        // 2. Determine clickable state (index is less than or equal to the highest completed step)
        const isClickable = index <= currentStepIndex;

        // Conditional rendering: Use Link if clickable, otherwise use a plain span or Box
        const LinkComponent = isClickable ? Link : "span";
        const linkProps = isClickable ? { href: item.to } : {};

        return (
          <Box
            key={index}
            sx={{
              flex: 1,
              textAlign: "center",
              // Conditional colors and opacity based on active/clickable state
              color: isActive ? "#580856b2" : isClickable ? "#424242" : "#BDBDBD",
              opacity: isClickable ? 1 : 0.6,
              cursor: isClickable ? "pointer" : "not-allowed",
              transition: "opacity 0.3s", // Smooth transition for visual change
            }}
          >
            {/* Link/Icon Wrapper */}
            <Box
              sx={{ fontSize: 32 }}
              component={LinkComponent}
              {...linkProps}
            >
              {item.icon}
            </Box>

            {/* Label */}
            <Typography
              variant="body2"
              sx={{
                mt: 1,
                fontWeight: isActive ? 600 : 400,
              }}
            >
              {item.label}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}