# Fracto Project

## Overview
Fracto is an **online doctor appointment booking system** with two main modules:
- **FractoBackend**: ASP.NET Core Web API (authentication, CRUD operations, appointments, ratings, file uploads, SignalR)
- **FractoFrontend**: Angular 16 application (user and admin dashboards, booking system, UI components)

---

## Architecture
- **Frontend**: Angular 16, Angular Material, RxJS, Forms
- **Backend**: ASP.NET Core Web API (.NET 9), EF Core ORM, JWT authentication
- **Database**: SQL Server (prod) or SQLite (dev)
- **File Storage**: wwwroot/uploads for profile/doctor images
- **Notifications**: Real-time using SignalR

---

## Setup Instructions

### Backend (FractoBackend)
1. Navigate to backend folder:
   ```bash
   cd FractoBackend
   dotnet restore
   dotnet build
   dotnet run
   ```
2. API runs at `http://localhost:5000`.
3. Update `appsettings.json` for DB connection string & JWT keys.
4. Visit Swagger at `http://localhost:5000/swagger` for API testing.

### Frontend (FractoFrontend)
1. Navigate to frontend folder:
   ```bash
   cd FractoFrontend
   npm install --legacy-peer-deps
   ng serve --open
   ```
2. Angular runs at `http://localhost:4200`.
3. Ensure `src/environments/environment.ts` points to backend API (`http://localhost:5000/api`).

---

## Features Implemented

### User
- Registration, Login (JWT)
- Search doctors by city/specialization/rating
- Book/cancel appointments with available timeslots
- Upload profile images
- Provide ratings for doctors
- Receive appointment confirmation notifications

### Admin
- CRUD operations for Users, Doctors, Specializations
- Manage Appointments (approve/reject)
- Send confirmation notifications
- View and manage ratings

---

## Database Schema
**Entities:**
- Users (UserId, Username, Email, PasswordHash, Role, City, ProfileImagePath)
- Doctors (DoctorId, Name, SpecializationId, City, Rating, ProfileImagePath)
- Specializations (SpecializationId, Name)
- Appointments (AppointmentId, UserId, DoctorId, AppointmentDate, TimeSlot, Status)
- Ratings (RatingId, DoctorId, UserId, Rating, Comment)

**Relationships:**
- Users ↔ Appointments (1..*)
- Doctors ↔ Appointments (1..*)
- Doctors ↔ Specializations (N..1)
- Users/Doctors ↔ Ratings (N..1)

---

## Key API Endpoints
- **Auth**: `/api/auth/register`, `/api/auth/login`
- **Users**: `/api/users` (CRUD, Admin only)
- **Doctors**: `/api/doctors`, `/api/doctors/{id}/timeslots`
- **Appointments**: `/api/appointments`, `/api/appointments/{id}/status`
- **Ratings**: `/api/ratings`, `/api/ratings/doctor/{doctorId}`
- **Specializations**: `/api/specializations`
- **Files**: `/api/files/upload/profile`

---

## Notifications (SignalR)
- Hub: `/hubs/notifications`
- Groups: `admins`, `user-{userId}`
- Used for appointment booking & status change events.

---

## Development Notes
- JWT stored in `localStorage`, attached to requests via Angular Interceptor.
- EF Core migrations used to update DB schema.
- Use Angular Material for responsive, user-friendly UI.
- For production: configure CORS, HTTPS, secure JWT keys, and deploy frontend via static hosting.

---

## Testing
- **Backend**: Run with `dotnet test`. Uses xUnit and EF InMemory for unit tests.
- **Frontend**: Run with `ng test`. Jasmine/Karma for unit tests.
- **Integration**: Test using Postman and E2E (Cypress/Playwright).

---

## Contributors
- **Manoj Madupalli** (Developer, Capstone Project)
Github Link :- https://github.com/manojmadupalli/CAPSTONE_FRACTO

---

## License
This project is for educational purposes (Capstone). Extendable for production use with proper security & scaling measures.
