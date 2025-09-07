// import { Component } from '@angular/core';
// import { AuthService } from '../../services/auth.service';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html'
// })
// export class RegisterComponent {
//   user = {
//     username: '',
//     fullName: '',
//     email: '',
//     password: '',
//     city: '',
//     role: 'User',   // default role
//     profileImagePath: 'uploads/profiles/default.png' // default image
//   };

//   success = '';
//   error = '';

//   constructor(private authService: AuthService) {}

//   register() {
//     if (!this.user.username || !this.user.password || !this.user.email) {
//       this.error = 'All required fields must be filled';
//       return;
//     }

//     this.authService.register(this.user).subscribe({
//       next: (res) => {
//         this.success = 'Registration successful! You can now login.';
//         this.error = '';
//       },
//       error: (err) => {
//         this.error = 'Registration failed. Try again.';
//         this.success = '';
//       }
//     });
//   }
// }


import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  user = {
    username: '',
    fullName: '',
    email: '',
    password: '',
    city: '',
    role: 'User'
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  register() {
    this.authService.register(this.user).subscribe({
      next: () => {
        this.snackBar.open('✅ Registration successful', 'Close', { duration: 3000 });
        this.router.navigate(['/login']);
      },
      error: () => {
        this.snackBar.open('❌ Registration failed', 'Close', { duration: 3000 });
      }
    });
  }
}
