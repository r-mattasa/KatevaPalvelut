import createGenericService from './genericservices';
import { Services, SubServices, BookingDetails, ProfileDetails,AppointmentSlotProps } from '../types/types'; 

// Service Endpoint: http://localhost:5000/services
export const platformServices = createGenericService<Services>('services');

// SubService Endpoint: http://localhost:5000/subservices
export const subService = createGenericService<SubServices>('subservices');

// provider profile Endpoint: http://localhost:5000/bookings
export const providerService = createGenericService<ProfileDetails>('profiles');

// Booking Endpoint: http://localhost:5000/bookings
export const bookingService = createGenericService<BookingDetails>('bookings');

// Booking Endpoint: http://localhost:5000/bookings
export const confirmationService = createGenericService<AppointmentSlotProps>('reservation');