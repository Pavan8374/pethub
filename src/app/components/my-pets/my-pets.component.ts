import { Component } from '@angular/core';
import { Pet } from '../../models/pets/pet.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-pets',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule],
  templateUrl: './my-pets.component.html',
  styleUrl: './my-pets.component.css'
})
export class MyPetsComponent {
  myPets: Pet[] = [
  {
    name: 'Sparky',
    type: 'Dog',
    health: 90,
    happiness: 80,
    hunger: 50,
    energy: 90,
    age: 230,
    imageURL: "assets/images/dog.jpg",
    makeSound() {
      return "bow bow";
    },
    feed(){},
    play(){
    },
    rest() {
    },
    petAge() {
    },
    wellBeing: 100
  },
  {
    name: 'Cheeku',
    type: 'Cat',
    health: 90,
    happiness: 80,
    hunger: 50,
    energy: 90,
    age: 230,
    imageURL: "assets/images/cat.jpg",
    makeSound() {
      return "bow bow";
    },
    feed(){},
    play(){
    },
    rest() {
    },
    petAge() {
    },
    wellBeing: 100
  }]
}
