// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { RegisterComponent } from './register.component';

// describe('RegisterComponent', () => {
//   let component: RegisterComponent;
//   let fixture: ComponentFixture<RegisterComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [RegisterComponent]
//     });
//     fixture = TestBed.createComponent(RegisterComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { AuthService } from '../../services/auth.service';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

class MockAuthService {
  register() {
    return of({});
  }
}

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [FormsModule, MatSnackBarModule],
      providers: [{ provide: AuthService, useClass: MockAuthService }]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should call register when form is valid', () => {
    spyOn(authService, 'register').and.returnValue(of({}));
    component.user = {
      username: 'test',
      password: '123',
      fullName: 'Test User',
      email: 'test@example.com',
      city: 'NY',
      role: 'User'
    };
    component.register();
    expect(authService.register).toHaveBeenCalled();
  });

  it('should handle register error', () => {
    spyOn(authService, 'register').and.returnValue(throwError(() => new Error('fail')));
    component.user = {
      username: 'test',
      password: '123',
      fullName: 'Test User',
      email: 'test@example.com',
      city: 'NY',
      role: 'User'
    };
    component.register();
    expect(authService.register).toHaveBeenCalled();
  });
});
