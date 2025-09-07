// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { DoctorSearchComponent } from './doctor-search.component';

// describe('DoctorSearchComponent', () => {
//   let component: DoctorSearchComponent;
//   let fixture: ComponentFixture<DoctorSearchComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [DoctorSearchComponent]
//     });
//     fixture = TestBed.createComponent(DoctorSearchComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DoctorSearchComponent } from './doctor-search.component';
import { DoctorService } from '../../services/doctor.service';
import { SpecializationService } from '../../services/specialization.service';
import { of } from 'rxjs';

class MockDoctorService {
  getDoctors() {
    return of([{ doctorId: 1, name: 'Dr. A', city: 'NY', specializationId: 1, rating: 4.5 }]);
  }
}
class MockSpecializationService {
  getSpecializations() {
    return of([{ specializationId: 1, specializationName: 'Cardiology' }]);
  }
}

describe('DoctorSearchComponent', () => {
  let component: DoctorSearchComponent;
  let fixture: ComponentFixture<DoctorSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoctorSearchComponent],
      providers: [
        { provide: DoctorService, useClass: MockDoctorService },
        { provide: SpecializationService, useClass: MockSpecializationService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DoctorSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should load doctors', () => {
    component.loadDoctors();
    expect(component.doctors.length).toBeGreaterThan(0);
  });

  it('should load specializations', () => {
    component.loadSpecializations();
    expect(component.specializations.length).toBeGreaterThan(0);
  });
});
