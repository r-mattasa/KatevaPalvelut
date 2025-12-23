export interface IProfile {
  name: string;
  email: string;
  phoneNumber: string;
  description: string;
}

export interface ConfirmationProps {
  isLoggedIn: boolean;
  freelancerName: string;
   serviceName: string
}

export interface Identifiable {
  id: number;
}

export interface Services extends Identifiable {
  service_id: number;
  name: string;
  description: string;
  image_url: string;
}

export interface SubServices extends Identifiable {
  subservice_id: number;
  name: string;
  service_id: number; 
  description: string;
}

export interface ProfileDetails extends Identifiable {
  profile_id: number;
  name: string;
  email: string;
  phoneNumber: number;
  description: string;
  status: boolean;
}


export interface BookingDetails extends Identifiable {
  customerId: number;
  serviceId: number; 
  bookingstatus: string;
  status: "pending" | "active" | "completed";
}

export interface AppointmentSlotProps {
  start_time: string;
  end_time: string;
  booking_date: string; 
  duration: string; 
  name: string;
  description: string;
  profileId: number; 
  subserviceId: number; 
}

export interface BookingConfirmationProps {
  start_time: string;
  end_time: string; 
  duration: string;
  name: string;
  description: string;
  profileId: number; 
  subserviceId: number; 
}

export interface BookingProps {
  profileId: string | null;
  description: string | null;
  subServiceId: number;
  slotStartTime: string | null;
  slotEndTime: string | null;
  slotDuration: number | 45; 
  providerName: string | null;
  bookingDate: string | null;
  subServiceName: string | null
}


export interface ConfirmationProps {
  duration: number | '45';
  freelancerName: string; 
  startTime: string | null;
  bookingDate: string | null;
  bookingId: string;
}