import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { SpecializationService } from '../../services/specialization.service';

@Component({
  selector: 'app-doctor-search',
  templateUrl: './doctor-search.component.html'
})
export class DoctorSearchComponent implements OnInit {
  doctors: any[] = [];
  specializations: any[] = [];
  cities: string[] = [];

  selectedCity = '';
  selectedSpecializationId: number | null = null;

  displayedColumns: string[] = ['name', 'city', 'specialization', 'rating'];

  constructor(
    private doctorService: DoctorService,
    private specializationService: SpecializationService
  ) {}

  ngOnInit(): void {
    this.loadDoctors();
    this.loadSpecializations();
  }

  loadDoctors() {
    this.doctorService.getDoctors().subscribe(res => {
      this.doctors = res;

      // Add specializationName property for display
      this.doctors.forEach((doc: any) => {
        const spec = this.specializations.find(s => s.specializationId === doc.specializationId);
        doc.specializationName = spec ? spec.specializationName : 'Unknown';
      });

      // Extract unique cities
      this.cities = [...new Set(res.map((d: any) => d.city))];
    });
  }

  loadSpecializations() {
    this.specializationService.getSpecializations().subscribe(res => {
      this.specializations = res;
      // refresh doctors with specialization names
      this.loadDoctors();
    });
  }

  search() {
    this.doctorService.getDoctors().subscribe(res => {
      this.doctors = res.filter((d: any) =>
        (this.selectedCity ? d.city === this.selectedCity : true) &&
        (this.selectedSpecializationId ? d.specializationId === this.selectedSpecializationId : true)
      );

      // Attach specialization names
      this.doctors.forEach((doc: any) => {
        const spec = this.specializations.find(s => s.specializationId === doc.specializationId);
        doc.specializationName = spec ? spec.specializationName : 'Unknown';
      });
    });
  }
}
