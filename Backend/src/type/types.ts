import { UUID } from "crypto";

export interface sevices {
  service_id: number; // or string if using UUID
  name: string;
  description?: string;
  created_at?: Date;
}
enum status {
'requested','accepted','confirmed','in_progress','completed','cancelled'
}
export interface SubServices {
  subservice_id: number; // or string if using UUID
  name: string;
  description?: string;
  service_id: number;
  created_at?: Date;
}

export interface ProviderProfile {
  profile_id: number;   // or UUID
  name: string;
  email: string;
  phone_number: string;
  description: string;
  active?: string;
  subservice_id: number;
  created_at?: Date;
}

export interface BookingDetails {
  booking_id: UUID;   // or UUID
  subservice_id:  number;
  customer_id?: string;
  provider_profile_id: string;
  service_address?: string | null;
  booking_status?: status | 'confirmed';
  booking_date?: string | null;
  start_time: string | null;
  end_time:string | null;
  total_hours: number | 45;
  created_at?: Date;
}
export interface NewBooking extends Omit<BookingDetails, 'booking_id'> {}

export interface CustomerDetails {
  customer_id: number;
  name: string;
  email: string;
  phone_number: string,
  notes: string | null;
  is_registerd_member: boolean | false;
  password?: string | null;
  created_at?: Date;
}
export interface NewCustomerData extends Omit<CustomerDetails, 'customer_id'> {}

export interface AvailableSlot {
    start_time: string; // e.g., "09:30"
    end_time: string;
    duration: number; // Always 45
}
export interface AvailableSlotQuery { 
    bookingDate?: string; 
}

export interface CustomerPayload {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    notes: string;
    is_registerd_member: boolean | false;
    password?: string | null;

}

export interface BookingPayload {
  profileId: string | null;
  description: string | null;
  subServiceId: number ;
  slotStartTime: string | null;
  slotEndTime: string | null;
  slotDuration: number | 45; 
  providerName: string | null;
  bookingDate: string | null;
}

export interface RequestBody {
    customer: CustomerPayload;
    booking: BookingPayload;
}