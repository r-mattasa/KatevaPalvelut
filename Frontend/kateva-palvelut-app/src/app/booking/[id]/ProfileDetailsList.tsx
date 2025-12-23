import { ProfileDetails } from "../../types/types";
import { Box, Card } from "@mui/material";
import ProfileCard from "./ProfileCard";

export const ProfileDetailsList = ({ profiles, BookingDate, subService }: { profiles: ProfileDetails[]; BookingDate: string; subService: number }) => {


  return (
    <>
      {profiles.length > 0 ? (
        profiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            profile={profile} 
            selectedDate={BookingDate}
            subService={subService}
          />
        ))
      ) : (
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 2,
            m: 20,
            boxShadow: 3,
            borderRadius: 2,
            // Add a hover effect for better UX
            "&:hover": {
              boxShadow: 6,
              cursor: "pointer",
            },
          }}
        >
          <Box sx={{
            display: "flex",
            alignItems: "center",
            p: 2,
            m: 2
          }}>No providers available for this date/time.</Box>
        </Card>
      )}
    </>
  );
};
