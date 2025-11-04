# Project plan template

## Project pitch

Kätevä Palvelut - online service platform connecting customers with cleaners, massagers, windowcleaners, house cleaning services, pet care, elderly care,  through distinct interfaces for each user type.

## MVP feature list

List the features the MVP (Minimum viable product) version of your application should have.

1. User will choose the type of service and sub service
2. Choose the subservice
3. choose the person (need some backend to to have profiles in the appropriate categories ans sub categories)
4. Select the time and date (appointment) and for the chosen profile.
5. As of pay in person option will be included(as of now only pay in person option) along with registration form and booking id.
6. In case of cancellation user can use booking Id or contact via email.
7. In case of Admin login and store booking and providers information -use google login.
8. Admin CRUD operations categories and subcategories.
9. Admin CRUD operatios for person profiles.

## Tech stack

List the technologies (programming languages, frameworks, essential libraries, etc) used in your project.
Backend : Node.js with Express
Frontend: React/next.js along with MUI and tailwind css
DB: postgresSQL
Eslint and prettier

## Backend

### Database tables

List the tables in your database, if your project needs one.
providers / categories
sub caterogies
profiles
price plan for each subcategory and 
bookings

### Endpoints

List the endpoints exposed by the backend

GET - /api/v1/services -> fetch all available services(categories)
GET - /api/v1/services/:id -> fetch specific service details

GET - /api/v1/subservices -> fetch all available subservices( subcategories)
GET - /api/v1/subservices/:id -> fetch specific subservice details (sub category)

GET - /api/v1/profiles -> fetch all service providers profile
GET - /api/v1/profiles/:id -> fetch specific service providers profile

GET - /api/v1/bookings -> Get all existing bookings for the selected profile (Stores all customer bookings for
specific profile)

POST - /api/v1/bookings -> Create a new booking (Create and Stores all customer bookings)

GET - /api/v1/bookings/:id -> Get specified booking details using id (booking id)

## Frontend

### UI Mockup

Show a mockup UI of your application's views, made with anything from MS Paint to Figma.

### Component list

List the key components used in the UI.

Home Page —  featured services

Service Listing Page — Grid view of all available services.

sub Service Details Page — Service info + “Book Now” button.

404 Page — “Page Not Found” friendly message. 

Booking confirmation form page.

Backend :
various end points

middle wares

(optional backend UI - admin login )Dashboard (Providers) —  manage services, profiles.

## Extra: Repository structure

 a rough draft is started

## Extra: Proposed timeline

What order are you planning to implement your features in?
DB schema
back end endpoints
front end UI Simple

## Optional features

List here any thought-out feature that doesn't make it into the MVP.
Admin login and fill up the details
user registration and login
Email sent to the  registered user and as well as the to the provider person (have to accept the request)
language localization
Modes (dark or light)