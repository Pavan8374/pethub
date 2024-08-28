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
  isDarkTheme: boolean = true;
  isNavbarCollapsed: boolean = true;
  
  constructor(
    private authService: AuthService, 
    private router: Router,
    private renderer: Renderer2,
    private toastr: CustomToasterService
    ) { }

    ngOnInit(): void {
      const savedTheme = localStorage.getItem('theme');
      this.isDarkTheme = savedTheme ? savedTheme === 'dark' : true;
      this.applyTheme();
    }
  
    toggleTheme() {
      this.isDarkTheme = !this.isDarkTheme;
      this.applyTheme();
      localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
    }
  
    applyTheme() {
      const themeClass = this.isDarkTheme ? 'dark-theme' : 'light-theme';
      this.renderer.removeClass(document.body, this.isDarkTheme ? 'light-theme' : 'dark-theme');
      this.renderer.addClass(document.body, themeClass);
    }

  isLoggedIn(): boolean {
    return this.authService.userIsLogin();
  }

  logout(): void {
    localStorage.removeItem(APP_AUTH_CONST);
    this.toastr.showInfo("", LogOutMessage )
    this.router.navigate(['/']);
  }
  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  closeNavbar(): void {
    this.isNavbarCollapsed = true;
  }
}
