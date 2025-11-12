import { Box, Typography, Container } from "@mui/material";
import HandshakeIcon from "@mui/icons-material/Handshake";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <Container sx={{ flexGrow: 1, py: 2, bgcolor: "#FFFFFF", boxShadow: 1 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          py: 1,
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <HandshakeIcon sx={{ fontSize: 50, color: "#c4c4c4" }} />
        <Typography variant="h5" sx={{ fontWeight: 500 }}>
          Kätevä Palvelut
        </Typography>
      </Box>
      <Navigation />
{/*       <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center", // <-- Centers vertically
          gap: 2, // Space between items
          my: 4,
        }}
      >
        <Image
          src="/handy2.png"
          alt="logo"
          width={150}
          height={150}
          priority
          style={{ borderRadius: "8px", margin: "4px", padding: "10px" }} // optional visual polish
        />

        <Typography variant="h6" sx={{ fontWeight: 200, textAlign: "center", fontSize: 16 }}>
          Kätevä Palvelut - Multi service platform
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center", // <-- Centers vertically
          gap: 8, // Space between items
          my: 10,
          p: 10,
          border: "1px solid #abb4bdff", // 3px, solid line, using the primary color hex
          borderRadius: "1px",
        }}
      >
        <LanRoundedIcon sx={{ fontSize: 64, color: "#03492eff" }} />
        <DisplaySettingsIcon sx={{ fontSize: 64, color: "#03492eff" }} />
        <CalendarMonthOutlinedIcon sx={{ fontSize: 64, color: "#03492eff" }} />
        <CheckCircleOutlinedIcon sx={{ fontSize: 64, color: "#03492eff" }} />
      </Box> */}
    </Container>
  );
}
