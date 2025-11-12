"use client";

import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import Image from "next/image";

const services = [
  {
    title: "Cleaning Services",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/images/cleaning.jpg",
  },
  {
    title: "Massage Services",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
    image: "/images/massage.jpg",
  },
  {
    title: "Pet care",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/images/childcare.jpg",
  },
  {
    title: "Elderly Care",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    image: "/images/childcare.jpg",
  },
];

export default function ServicesPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={3}>
        {services.map((item, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                p: 2,
              }}
            >
              {/* ✅ Image */}
              <Box sx={{ width: 100, height: 100, position: "relative" }}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  style={{ objectFit: "cover", borderRadius: 8 }}
                />
              </Box>

              {/* ✅ Text content (Equal Height) */}
              <CardContent
                sx={{
                  flexGrow: 1,
                  minHeight: 90, // ensures consistent card height
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  p: 0,
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 2 }}>
                  {item.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mt: 1,
                    display: "-webkit-box",
                    WebkitLineClamp: 2, // 👈 ensures consistent text height
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
