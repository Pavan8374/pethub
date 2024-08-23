import { Component, inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pet-management',
  standalone: true,
  templateUrl: './pet-management.component.html',
  styleUrls: ['./pet-management.component.css']
})

@Injectable({
  providedIn: 'root',
})

export class PetManagementComponent {

  private router = inject(Router);

  onAddPet() {
    this.router.navigate(['/admin/pets/add']);
  }

  onUpdatePet(id: number) {
    this.router.navigate(['/admin/pets/update', id]);
  }

  onRemovePet(id: number) {
    this.router.navigate(['/admin/pets/remove', id]);
  }
}
