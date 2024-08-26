import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule,
    ReactiveFormsModule,
    RouterModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Virtual-Pet-Sanctuary';
  private router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit(): void {
    debugger
    this.checkUserRoleAndRedirect();
  }
  private checkUserRoleAndRedirect(): void {
    if (this.authService.isTokenExpired()) {
      this.authService.clearAuthToken();
      this.router.navigate(['/login']);
    } 
    else {
      const role = this.authService.getRole();
      if (role === 'Admin') {
        this.router.navigate(['/admin/dashboard']);
      } 
      this.router.navigate(['/home']);
    }
  }
}

