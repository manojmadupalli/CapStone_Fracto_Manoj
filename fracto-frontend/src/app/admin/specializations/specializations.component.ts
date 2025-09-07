import { Component, OnInit } from '@angular/core';
import { SpecializationService } from '../../services/specialization.service';

@Component({
  selector: 'app-admin-specializations',
  templateUrl: './specializations.component.html'
})
export class SpecializationsComponent implements OnInit {
  specializations: any[] = [];
  specializationName = '';
  displayedColumns: string[] = ['specializationName', 'actions'];

  constructor(private specializationService: SpecializationService) {}

  ngOnInit(): void {
    this.loadSpecializations();
  }

  loadSpecializations() {
    this.specializationService.getSpecializations().subscribe(res => (this.specializations = res));
  }

  addSpecialization() {
    if (!this.specializationName) return;
    this.specializationService.addSpecialization({ specializationName: this.specializationName }).subscribe(() => {
      this.loadSpecializations();
      this.specializationName = '';
    });
  }

  deleteSpecialization(id: number) {
    if (confirm('Delete this specialization?')) {
      this.specializationService.deleteSpecialization(id).subscribe(() => this.loadSpecializations());
    }
  }
}
