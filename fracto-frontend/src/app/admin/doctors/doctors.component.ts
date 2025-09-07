import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-admin-doctors',
  templateUrl: './doctors.component.html'
})
export class DoctorsComponent implements OnInit {
  doctors: any[] = [];
  doctor = { name: '', city: '', specializationId: 1, rating: 0 };
  displayedColumns: string[] = ['name', 'city', 'specializationId', 'rating', 'actions'];

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors() {
    this.doctorService.getDoctors().subscribe(res => (this.doctors = res));
  }

  addDoctor() {
    if (!this.doctor.name || !this.doctor.city) return;
    this.doctorService.addDoctor(this.doctor).subscribe(() => {
      this.loadDoctors();
      this.doctor = { name: '', city: '', specializationId: 1, rating: 0 };
    });
  }

  deleteDoctor(id: number) {
    if (confirm('Delete this doctor?')) {
      this.doctorService.deleteDoctor(id).subscribe(() => this.loadDoctors());
    }
  }
}
