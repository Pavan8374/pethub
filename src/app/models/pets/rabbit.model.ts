import { Pet } from './pet.model';

export class Rabbit extends Pet {
  constructor(
    id: string,
    name: string,
    public earLength: number
  ) {
    super(id, name, 'Rabbit');
  }

  makeSound(): string {
    return 'Squeak!';
  }

  hop(): void {
    this.happiness = Math.min(100, this.happiness + 5);
    this.energy = Math.max(0, this.energy - 8);
  }
}