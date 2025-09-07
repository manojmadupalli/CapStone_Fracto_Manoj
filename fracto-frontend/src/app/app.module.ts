// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms';
// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { LoginComponent } from './auth/login/login.component';
// import { RegisterComponent } from './auth/register/register.component';
// import { UserListComponent } from './users/user-list/user-list.component';
// import { UserEditComponent } from './users/user-edit/user-edit.component';
// import { DoctorListComponent } from './doctors/doctor-list/doctor-list.component';
// import { DoctorEditComponent } from './doctors/doctor-edit/doctor-edit.component';
// import { SpecializationListComponent } from './specializations/specialization-list/specialization-list.component';
// import { AppointmentListComponent } from './appointments/appointment-list/appointment-list.component';
// import { AppointmentBookComponent } from './appointments/appointment-book/appointment-book.component';
// import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
// import { AuthInterceptor } from './interceptors/auth.interceptor';
// import { CitySelectionComponent } from './city/city-selection/city-selection.component';
// import { DoctorSearchComponent } from './doctors/doctor-search/doctor-search.component';

// @NgModule({
//   declarations: [
//     AppComponent,
//     LoginComponent,
//     RegisterComponent,
//     UserListComponent,
//     UserEditComponent,
//     DoctorListComponent,
//     DoctorEditComponent,
//     SpecializationListComponent,
//     AppointmentListComponent,
//     AppointmentBookComponent,
//     CitySelectionComponent,
//     DoctorSearchComponent
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     FormsModule,
//     HttpClientModule
//   ],
//   providers: [
//   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
// ],

//   bootstrap: [AppComponent]
// })
// export class AppModule { }


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { MatSnackBarModule } from '@angular/material/snack-bar';
// Angular Material Modules
import { MatIconModule } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import {MatSliderModule} from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Components
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { DoctorListComponent } from './doctors/doctor-list/doctor-list.component';
import { DoctorSearchComponent } from './doctors/doctor-search/doctor-search.component';
import { SpecializationListComponent } from './specializations/specialization-list/specialization-list.component';
import { AppointmentListComponent } from './appointments/appointment-list/appointment-list.component';
import { AppointmentBookComponent } from './appointments/appointment-book/appointment-book.component';

// Interceptors
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UsersComponent } from './admin/users/users.component';
import { DoctorsComponent } from './admin/doctors/doctors.component';
import { SpecializationsComponent } from './admin/specializations/specializations.component';
import { AppointmentsComponent } from './admin/appointments/appointments.component';
import { RateDoctorComponent } from './ratings/rate-doctor/rate-doctor.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserListComponent,
    DoctorListComponent,
    DoctorSearchComponent,
    SpecializationListComponent,
    AppointmentListComponent,
    AppointmentBookComponent,
    AdminDashboardComponent,
    UsersComponent,
    DoctorsComponent,
    SpecializationsComponent,
    AppointmentsComponent,
    RateDoctorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    //MatSnackBarModule
    // Material
    MatOptionModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatSelectModule,
    MatSliderModule,
    MatDatepickerModule,
    MatRadioModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
