import createGenericService from './genericservices';
import { Services, SubServices, BookingDetails, ProfileDetails,AppointmentSlotProps } from '../types/types'; 

// Service Endpoint: ${NEXT_PUBLIC_API_URL}/services
export const platformServices = createGenericService<Services>('services');

// SubService Endpoint: ${NEXT_PUBLIC_API_URL}/subservices
export const subService = createGenericService<SubServices>('subservices');

// provider profile Endpoint: ${NEXT_PUBLIC_API_URL}/bookings
export const providerService = createGenericService<ProfileDetails>('profiles');

// Booking Endpoint: ${NEXT_PUBLIC_API_URL}/bookings
export const bookingService = createGenericService<BookingDetails>('bookings');

// Booking Endpoint: ${NEXT_PUBLIC_API_URL}/bookings
export const confirmationService = createGenericService<AppointmentSlotProps>('reservation');