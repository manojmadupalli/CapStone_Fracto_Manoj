import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { DoctorService } from '../../services/doctor.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-admin-appointments',
  templateUrl: './appointments.component.html'
})
export class AppointmentsComponent implements OnInit {
  appointments: any[] = [];
  doctors: any[] = [];
  users: any[] = [];
  displayedColumns: string[] = ['user', 'doctor', 'appointmentDate', 'timeSlot', 'status', 'actions'];

  constructor(
    private appointmentService: AppointmentService,
    private doctorService: DoctorService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(res => {
      this.users = res;
      this.loadDoctors();
    });
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
        const user = this.users.find(u => u.userId === a.userId);
        return {
          ...a,
          doctorName: doc ? doc.name : 'Unknown',
          specializationName: doc ? doc.specializationName || '' : '',
          userName: user ? user.username : 'Unknown'
        };
      });
    });
  }

updateStatus(id: number, status: string) {
  this.appointmentService.updateStatus(id, status)
    .subscribe(() => this.loadAppointments());
}


  deleteAppointment(id: number) {
    if (confirm('Cancel this appointment?')) {
      this.appointmentService.deleteAppointment(id).subscribe(() => this.loadAppointments());
    }
  }
}
