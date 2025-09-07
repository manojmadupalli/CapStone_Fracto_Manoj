// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { AppointmentBookComponent } from './appointment-book.component';

// describe('AppointmentBookComponent', () => {
//   let component: AppointmentBookComponent;
//   let fixture: ComponentFixture<AppointmentBookComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [AppointmentBookComponent]
//     });
//     fixture = TestBed.createComponent(AppointmentBookComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppointmentBookComponent } from './appointment-book.component';
import { AppointmentService } from '../../services/appointment.service';
import { DoctorService } from '../../services/doctor.service';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

class MockDoctorService {
  getDoctors() {
    return of([{ doctorId: 1, name: 'Dr. A', city: 'NY', specializationId: 1 }]);
  }
}
class MockAppointmentService {
  bookAppointment() {
    return of({});
  }
}

describe('AppointmentBookComponent', () => {
  let component: AppointmentBookComponent;
  let fixture: ComponentFixture<AppointmentBookComponent>;
  let appointmentService: AppointmentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppointmentBookComponent],
      imports: [FormsModule, MatSnackBarModule],
      providers: [
        { provide: DoctorService, useClass: MockDoctorService },
        { provide: AppointmentService, useClass: MockAppointmentService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppointmentBookComponent);
    component = fixture.componentInstance;
    appointmentService = TestBed.inject(AppointmentService);
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should load doctors', () => {
    component.loadDoctors();
    expect(component.doctors.length).toBe(1);
  });

  it('should book appointment successfully', () => {
    spyOn(appointmentService, 'bookAppointment').and.returnValue(of({}));
    component.appointment = { doctorId: 1, appointmentDate: '2025-09-05', timeSlot: '10:00 AM', status: 'Pending' };
    component.book();
    expect(appointmentService.bookAppointment).toHaveBeenCalled();
  });

  it('should handle booking error', () => {
    spyOn(appointmentService, 'bookAppointment').and.returnValue(throwError(() => new Error('fail')));
    component.appointment = { doctorId: 1, appointmentDate: '2025-09-05', timeSlot: '10:00 AM', status: 'Pending' };
    component.book();
    expect(appointmentService.bookAppointment).toHaveBeenCalled();
  });
});
