"use client";

import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MuiGrid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { SubServices } from "@/app/types/types";

export default function SubServicesList({ data }: { data: SubServices[] }) {
  return (
    <Box sx={{ py: 4 }}> 
      <MuiGrid container spacing={3}>
        {data?.map((item, index) => (
          <MuiGrid  key={index} sx={{ display: "flex" }}>
            <Card
              component={Link}
              href={`/booking/${item.subservice_id}`} // clicking card opens sub-page
              sx={{
                flex: 1, //  ensures equal height
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textDecoration: "none",
                textAlign: "center",
                borderRadius: 2,
                p: 3,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                transition: "0.3s",
                "&:hover": {
                  boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
                  transform: "translateY(-3px)",
                },
              }}
            >
              {/* Icon */}
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  backgroundColor: "#eedbdbff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <CheckCircleOutlinedIcon sx={{ fontSize: 40, color: "#6A2BBE" }} />
              </Box>

              {/* Text */}
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 0,
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {item.name}
                </Typography>

                {item.description && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1, maxWidth: 260 }}
                  >
                    {item.description}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </MuiGrid>
        ))}
      </MuiGrid>
    </Box>
  );
}