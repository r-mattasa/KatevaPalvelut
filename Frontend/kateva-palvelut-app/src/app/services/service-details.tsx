"use client";

import { useState, useEffect } from "react";
import { Services } from "../types/types";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { platformServices } from "../platform-service/platformservices";

/*   const services = [
  {
    id: 1,
    title: "Cleaning Services",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    image: "/images/cleaning.jpg",
  },
  {
    id: 2,
    title: "Massage Services",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/massage.jpg",
  },

  {
    id: 3,
    title: "Pet care",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    image: "/images/childcare.jpg",
  },
  {
    id: 4,
    title: "Elderly Care",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/childcare.jpg",
  },
];
 */
const ServiceDetails: React.FC = () => {
  const [allServices, setAllServices] = useState<Services[]>([]);
  useEffect(() => {
    // 
    const fetchServices = async () => {
      try {
        const services = await platformServices.getAll();
        
        // 2. Set the state after the data is fetched
        setAllServices(services);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      }
    };


    fetchServices();
  }, []);

  return (
    <Box sx={{ py: 4 }}>
      <Grid container spacing={4} alignItems="stretch">
        {allServices?.map((item, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index} sx={{ display: "flex" }}>
            <Card
              component={Link}
               href={`/subservices/${item.service_id}`}
              sx={{
                flex: 1,
                width: 200,
                height: 250,
                display: "flex",
                flexDirection: "column", 
                alignItems: "center",
                textAlign: "center",
                borderRadius: 2,
                p: 3,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                cursor: "pointer",
                "&:hover": { boxShadow: "0 4px 14px rgba(0,0,0,0.15)" },
              }}
            >
              <CardMedia
                component="img"
                image={`${item.image_url}`}
                sx={{
                  width: 100,
                  height: 100,
                  objectFit: "contain",
                  mb: 2,
                  borderRadius: "12px",
                  backgroundColor: "#F5F5F5",
                  p: 2,
                }}
              />

              <CardContent
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  p: 0,
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ justifyContent: "left" }}>
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default ServiceDetails;
