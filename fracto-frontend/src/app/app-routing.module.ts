import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Auth
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

// User
import { DoctorSearchComponent } from './doctors/doctor-search/doctor-search.component';
import { AppointmentBookComponent } from './appointments/appointment-book/appointment-book.component';
import { AppointmentListComponent } from './appointments/appointment-list/appointment-list.component';

// Admin
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UsersComponent } from './admin/users/users.component';
import { DoctorsComponent } from './admin/doctors/doctors.component';
import { SpecializationsComponent } from './admin/specializations/specializations.component';
import { AppointmentsComponent } from './admin/appointments/appointments.component';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Auth
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // User routes
  { path: 'doctor-search', component: DoctorSearchComponent, canActivate: [AuthGuard] },
  { path: 'appointment-book', component: AppointmentBookComponent, canActivate: [AuthGuard] },
  { path: 'appointments', component: AppointmentListComponent, canActivate: [AuthGuard] },

  // Admin routes
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard],
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'doctors', component: DoctorsComponent },
      { path: 'specializations', component: SpecializationsComponent },
      { path: 'appointments', component: AppointmentsComponent },
      { path: '', redirectTo: 'users', pathMatch: 'full' }
    ]
  },

  // Fallback
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
