import { Component, inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

@Injectable({
  providedIn: 'root',
})
export class DashboardComponent {
  private router = inject(Router);
  navigateToPetsManagement() {
    this.router.navigate(['admin/pets']); // Adjust the route path as per your routing configuration
  }
}
