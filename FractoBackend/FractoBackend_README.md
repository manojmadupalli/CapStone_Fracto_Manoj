# FractoBackend

## Overview
Fracto Backend is built with **ASP.NET Core Web API (.NET 9)**. It provides REST APIs for user authentication, doctor management, appointment booking, ratings, and file uploads. Real-time notifications are powered by SignalR.

## Prerequisites
- .NET 9 SDK (9.0.304 or higher)
- EF Core Tools: `dotnet tool install --global dotnet-ef`
- Database: SQL Server (prod) or SQLite (dev)

## Getting Started
```bash
cd FractoBackend
dotnet restore
dotnet build
dotnet run
```

API will run on `http://localhost:5000`.

## Configuration
- Update `appsettings.json` for `ConnectionStrings` and `Jwt` secrets.
- Example (SQLite):
```json
"ConnectionStrings": {
  "DefaultConnection": "Data Source=fracto.db"
}
```

## Important Endpoints
- Auth: `POST /api/auth/register`, `POST /api/auth/login`
- Users: `GET /api/users`, `PUT /api/users/{id}`, `DELETE /api/users/{id}`
- Doctors: `GET /api/doctors`, `POST /api/doctors`, `GET /api/doctors/{id}/timeslots`
- Appointments: `POST /api/appointments`, `PUT /api/appointments/{id}`, `DELETE /api/appointments/{id}`
- Ratings: `POST /api/ratings`, `GET /api/ratings/doctor/{doctorId}`
- Specializations: `GET /api/specializations`, `POST /api/specializations`
- Files: `POST /api/files/upload/profile`

## Swagger
Visit `http://localhost:5000/swagger` for interactive API docs.

## Notifications (SignalR)
Hub Path: `/hubs/notifications`. Clients connect with JWT `access_token`.

## Tests
```bash
dotnet test
```

Github Link :- https://github.com/manojmadupalli/CapStone_Fracto_Manoj
