import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html'
})
export class AppointmentListComponent implements OnInit {
  appointments: any[] = [];
  doctors: any[] = [];
  displayedColumns: string[] = ['doctor', 'appointmentDate', 'timeSlot', 'status'];

  constructor(
    private appointmentService: AppointmentService,
    private doctorService: DoctorService
  ) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors() {
    this.doctorService.getDoctors().subscribe(res => {
      this.doctors = res;
      this.loadAppointments();
    });
  }

  loadAppointments() {
    this.appointmentService.getAppointments().subscribe(res => {
      this.appointments = res.map((a: any) => {
        const doc = this.doctors.find(d => d.doctorId === a.doctorId);
        return {
          ...a,
          doctorName: doc ? doc.name : 'Unknown',
          specializationName: doc ? doc.specializationName || '' : ''
        };
      });
    });
  }
}
