# Multi-Service Platform -  Booking App - Kätevä Palvelut

## Overview

This repository contains the code for a multi-platform service application designed to handle a step-by-step booking process. The project is split into a frontend built with **Next.js** and a scalable backend API powered by **Express**, both written in **TypeScript**. For Frontend Styling: I have used Material-UI (MUI): Component library for consistent UI design and implementation.

The primary goal is to provide a guided user experience for selecting services, sub-services, making a reservation, and receiving confirmation.

### Getting Started

Follow these steps to get the frontend and backend running locally.
Follow these steps to get the frontend and backend running locally.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A running **PostgreSQL** instance

### 1. Database Setup

1. Create a new PostgreSQL database (for e.g., `service_booking_db`).
2. Run your initial SQL schema scripts (not included in this repo) to create necessary tables (`services`, `subservices`, `appointments`, etc.).

### 2. Backend Installation & Setup

1. Navigate to the `backend/` directory:

   ```bash
   cd backend
   npm install
   ```

2. Create a `.env` file in the `backend/` directory and add your database connection string and port:

   ``` text
   # .env file in backend/
   DATABASE_URL="postgresql://user:password@host:port/service_booking_db"
   PORT=5000
   ```

3. Start the backend API (using `ts-node` or `nodemon`):

   ```bash
   npm run dev
   ```

   The API should now be running at `http://localhost:5000`.

### 3. Frontend Installation & Setup

1. Navigate to the `frontend/` directory:

   ```bash
   cd ../frontend
   npm install
   ```

2. Create a `.env.local` file in the `frontend/` directory to define the public API endpoint:

   ``` text
   # .env.local file in frontend/
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

3. Start the Next.js development server:

   ```bash
   npm run dev
   ```

   The application should now be accessible at `http://localhost:3000`.

  ![katevapalvelut](./assests_readme/img2.png)
  ![katevapalvelut](./assests_readme/img3.png)
  ![katevapalvelut](./assests_readme/img4.png)
  ![katevapalvelut](./assests_readme/img1.png)

## Contribution

Contributions are welcome! Please follow these basic steps:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature-name`.
3. Commit your changes: `git commit -m 'feat: concise description of the change'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a Pull Request.
