// src/app/models/dog.model.ts

import { Pet } from './pet.model';

export class Dog extends Pet
{
    constructor(
        id: string,
        name: string,
        public breed: string
    )
    {
        super(id, name, 'Dog');
    }

    makeSound(): string
    {
        return 'Woof!';
    }

    fetch(): void
    {
        this.happiness = Math.min(100, this.happiness + 10);
        this.energy = Math.max(0, this.energy - 15);
    }
}



