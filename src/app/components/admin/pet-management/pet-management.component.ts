import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pet-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pet-management.component.html',
  styleUrl: './pet-management.component.css'
})
export class PetManagementComponent {
  pets = [
    { name: 'Buddy', type: 'Dog', age: 3 },
    { name: 'Whiskers', type: 'Cat', age: 2 },
    { name: 'Goldie', type: 'Fish', age: 1 },
    { name: 'Spike', type: 'Turtle', age: 4 }
  ];

  addPet() {
    // Logic for adding a pet (to be implemented later)
    alert('Add Pet functionality coming soon!');
  }
}
