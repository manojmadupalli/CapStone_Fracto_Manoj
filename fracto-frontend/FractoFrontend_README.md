# FractoFrontend

## Overview
Fracto Frontend is built with **Angular 16** and **Angular Material**. It provides UI for users and admins to interact with the backend.

## Prerequisites
- Node.js (LTS)
- npm
- Angular CLI 20.2.1

## Getting Started
```bash
cd FractoFrontend
npm install --legacy-peer-deps
ng serve --open
```

Runs on `http://localhost:4200`.

## Environment Config
Update `src/environments/environment.ts`:
```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api'
};
```

## Key Features
- Auth: Login, Register with JWT
- Users: Admin CRUD
- Doctors: Search, CRUD, Ratings
- Appointments: Book, Manage, Approve/Reject
- File Upload: Profile images
- SignalR: Real-time notifications

## Structure
- `src/app/auth` — login, register, guards
- `src/app/services` — API services
- `src/app/appointments` — booking and list
- `src/app/admin` — admin modules
- `src/app/shared` — navbar, snackbar, file upload

## Build for Production
```bash
ng build --configuration production
```
Deploy `dist/fracto` folder.

## Common Issues
- Install missing builder: `npm install --save-dev @angular-devkit/build-angular`
- `ngModel` errors: Import `FormsModule` in `AppModule`.
- Angular Material errors: Import required Material modules.


Github Link :- https://github.com/manojmadupalli/CapStone_Fracto_Manoj