import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Pet {
  id: number;
  name: string;
  type: string;
  imageUrl: string;
  description: string;
  age: number;
  energy: number;
  happiness: number;
  funFact?:string;
}

@Component({
  selector: 'app-adoption-center',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './adoption-center.component.html',
  styleUrls: ['./adoption-center.component.css']
})
export class AdoptionCenterComponent {
  availablePets: Pet[] = [
    {
      id: 1,
      name: 'Buddy',
      type: 'Dog',
      imageUrl: 'assets/images/dog.jpg',
      description: 'Friendly golden retriever who loves to play fetch.',
      age: 730,
      energy: 85,
      happiness: 90,
      funFact: "cute little dogs never smile"
    },
    {
      id: 2,
      name: 'Whiskers',
      type: 'Cat',
      imageUrl: 'assets/images/cat.jpg',
      description: 'Curious tabby cat with a love for sunny windowsills.',
      age: 1095,
      energy: 60,
      happiness: 75,
      funFact: "Cats are faster than snakes interms of speed of action"
    },
    {
      id: 3,
      name: 'Hoppy',
      type: 'Rabbit',
      imageUrl: 'assets/images/bunny.jpg',
      description: 'Energetic bunny who enjoys hopping around the garden.',
      age: 365,
      energy: 95,
      happiness: 85,
      funFact: "Bunny's never forget to eat"
    },
    // Add more mock pets as needed
  ];

  adoptPet(pet: Pet): void {
    // For now, just remove the pet from the list
    this.availablePets = this.availablePets.filter(p => p.id !== pet.id);
    alert(`Congratulations! You've adopted ${pet.name}!`);
  }

  getPetTypeBadgeClass(type: string): string {
    switch (type.toLowerCase()) {
      case 'dog':
        return 'badge-dog';
      case 'cat':
        return 'badge-cat';
      case 'rabbit':
        return 'badge-rabbit';
      default:
        return 'badge-secondary';
    }
  }
}