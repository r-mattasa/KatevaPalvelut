import React, { useState, useEffect } from "react";
import { Card, Box } from "@mui/material";
import { ProfileDetails } from "../../types/types";
import AppointmentSlot from './AppointmentSlot';
import { CircularProgress } from '@mui/material';

interface ProfileDetailsProps {
  key: number;
  profile: ProfileDetails;
  selectedDate: string;
  subService: number;
}

interface TimeSlots {
  start_time: string; // e.g., "09:30"
  end_time: string;
  duration: number;
}

const ProfileCard: React.FC<ProfileDetailsProps> = ({ key, profile, selectedDate, subService }) => {
  // State for the Bio/Description dropdown (Collapse)
  /* const [showBioDetails, setShowBioDetails] = useState(false); */
  const [TimeSlotDetails, setTimeSlotDetails] = useState<TimeSlots[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const providerId = profile.profile_id;

  // Use useEffect to run the fetch operation only when dependencies change
  useEffect(() => {
    if (!providerId || !selectedDate) return; // Prevent fetch if data is missing

    const apiUrl = `http://localhost:5000/reservation/${providerId}/slots?bookingDate=${selectedDate}`;

    const fetchTimeSlots = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: TimeSlots[] = await response.json();
        console.log("Available Slots:", data);
        setTimeSlotDetails(data);
      } catch (err) {
        console.error("Error fetching slots:", err);
        // Use type checking for error object in TypeScript
        setError(err instanceof Error ? err.message : "Failed to fetch time slots.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTimeSlots();

    // Dependency Array: Reruns fetch whenever providerId or selectedDate changes
  }, [providerId, selectedDate]);

  return (
    <Card
      
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 2,
        mb: 2,
        boxShadow: 3,
        borderRadius: 2,
        // Add a hover effect for better UX
        "&:hover": {
          boxShadow: 6,
          cursor: "pointer",
        },
      }}
    >
      {isLoading ? (
            // 💡 Show the loading indicator when fetching
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
                <CircularProgress />
            </Box>
        ): (
      TimeSlotDetails?.map((slot, index) => (
        <AppointmentSlot 
  
            key={index} 
            // --- TIME SLOT DATA (Individual to this item) ---
            booking_date= {selectedDate}
            start_time={slot.start_time}
            end_time= {slot.end_time}
            duration={`${slot.duration}`} 
            // --- BOOKING IDs (Constant for this profile/service) ---
            profileId={profile.profile_id}
            subserviceId={subService} 
            // --- PROFILE DETAILS (Constant for this profile) ---
            name={profile.name}
            description = {profile.description}
        />
    ))
  ) };
    </Card>
  );
};
export default ProfileCard;
