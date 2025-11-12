export interface IProfile {
  name: string;
  email: string;
  phoneNumber: string; 
  active: boolean; 
  title: string;
  location: string;
  avatarUrl: string;
  bio: string;
  yearsOfExperience: number; // Added for the description
}

export interface ConfirmationProps {
  isLoggedIn: boolean;
  freelancerName: string; 
}

// types/api.ts or services/types.ts

// Base interface ensures all resources have an ID
export interface Identifiable {
  id: number;
}

// 1. Service Interface 
export interface Services extends Identifiable {
  service_id: number;
  name: string;
  description: string;
}

export interface SubServices extends Identifiable {
  subservice_id: number;
  name: string;
  service_id: number; // Foreign key linking to the parent Service
  description: string;
}

export interface ProfileDetails extends Identifiable {
 name: string;
 email: string;
 description: string;
 status: boolean;
}


// 3. Booking Interface (e.g., a customer's requested project)
export interface BookingDetails extends Identifiable {
  customerId: number;
  serviceIds: number[]; // A list of services/subservices booked
  bookingstatus: string;
  status: 'pending' | 'active' | 'completed';
}
