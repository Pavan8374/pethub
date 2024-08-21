import { Component, Renderer2 } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { APP_AUTH_CONST } from '../../consts/message';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  constructor(private authService: AuthService, 
    private router: Router,
    private renderer: Renderer2
  ) { }



  ngOnInit(): void {
    this.isDarkMode = localStorage.getItem('theme') === 'dark';
    this.updateTheme();

    const navLinks = document.querySelectorAll('.nav-item a');
    const navbarCollapse = document.getElementById('navbarSupportedContent');

    navLinks.forEach(link => {
      this.renderer.listen(link, 'click', () => {
        if (navbarCollapse?.classList.contains('show')) {
          this.renderer.removeClass(navbarCollapse, 'show');
        }
      });
    });
  }
  
  toggleTheme(): void {
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
      // Clear the authentication token or perform any necessary cleanup
      localStorage.removeItem(APP_AUTH_CONST); // Replace 'YOUR_AUTH_KEY' with your actual key
      this.router.navigate(['/']); // Redirect to home or any other page after logout
  }
}
