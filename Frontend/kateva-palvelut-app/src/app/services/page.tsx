import ServiceDetails from "./service-details";

export default function ServicesPage() {
  return ( <ServiceDetails /> );
}
/* export default function ServicesPage() {

   return (
    <Box sx={{ py: 4 }}>
      <Grid container spacing={2} alignItems="stretch">
        {services.map((item, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index} sx={{ display: "flex" }}>
            <Card
              component={Link}
              href={`/subservices/${item.id}`}
              sx={{
                flex: 1,
                width: 200,
                height: 200,
                display: "flex",
                flexDirection: "column", // ✅ stack items vertically
                alignItems: "center", // ✅ center horizontally
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
                image={item.image}
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
                  flexGrow: 1, // ✅ ensures text area fills height evenly
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  p: 0,
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );  
}*/
