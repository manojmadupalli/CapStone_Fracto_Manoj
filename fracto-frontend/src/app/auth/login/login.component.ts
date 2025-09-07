// import { Component } from '@angular/core';
// import { AuthService } from '../../services/auth.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html'
// })
// export class LoginComponent {
//   username = '';
//   password = '';
//   error = '';

//   constructor(private authService: AuthService) {}

//   login() {
//     this.authService.login({ username: this.username, password: this.password })
//       .subscribe({
//         next: (res) => {
//           this.authService.saveToken(res.token);
//           alert('Login successful!');
//         },
//         error: (err) => {
//           this.error = 'Invalid username or password';
//         }
//       });
//   }
// }


import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  login() {
    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token);
        this.snackBar.open(' Login successful', 'Close', { duration: 3000 });
        this.router.navigate(['/doctor-search']); // redirect to user dashboard
      },
      error: () => {
        this.snackBar.open(' Invalid credentials', 'Close', { duration: 3000 });
      }
    });
  }
}
