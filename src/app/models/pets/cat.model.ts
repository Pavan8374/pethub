// src/app/models/cat.model.ts

import { Pet } from './pet.model';

export class Cat extends Pet {
  constructor(
    id: string,
    name: string,
    public furColor: string
  ) {
    super(id, name, 'Cat');
  }

  makeSound(): string {
    return 'Meow!';
  }

  climbTree(): void {
    this.happiness = Math.min(100, this.happiness + 8);
    this.energy = Math.max(0, this.energy - 12);
  }
}