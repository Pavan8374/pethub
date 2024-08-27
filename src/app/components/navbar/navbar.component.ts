import { ChangeDetectorRef, Component, Renderer2 } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { APP_AUTH_CONST, LogOutMessage } from '../../consts/message';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomToasterService } from '../../services/custom-toaster.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet,FormsModule,
    ReactiveFormsModule,
    RouterModule,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isDarkMode = false;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private renderer: Renderer2,
    private toastr: CustomToasterService
    ) { }

  ngOnInit(): void {
    this.isDarkMode = localStorage.getItem('theme') === 'dark';
  }

  toggleTheme(): void {
    debugger;
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.updateTheme();
  }

  updateTheme(): void {
    const theme = this.isDarkMode ? 'dark' : 'light';
    this.renderer.setAttribute(document.body, 'data-theme', theme);
  }

  isLoggedIn(): boolean {
    return this.authService.userIsLogin();
  }

  logout(): void {
    localStorage.removeItem(APP_AUTH_CONST);
    this.toastr.showInfo("", LogOutMessage )
    this.router.navigate(['/']);
  }
}
