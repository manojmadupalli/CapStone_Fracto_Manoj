import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  role: string | null = null;
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.refreshAuthState();
  }

  refreshAuthState() {
    this.role = this.authService.getRole();
    this.isLoggedIn = !!this.authService.getToken();
  }

  logout() {
    this.authService.logout();
    this.refreshAuthState();
    this.router.navigate(['/login']);
  }
}
