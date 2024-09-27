import { Component, inject } from '@angular/core';
import { StatsChartComponent } from '../stats-chart/stats-chart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    StatsChartComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  onClickAdoptionCenterButton() {
    debugger;
    if (this.authService.userIsLogin()) {
      this.router.navigate(['/adoption-center']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
