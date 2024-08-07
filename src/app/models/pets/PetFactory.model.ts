// src/app/models/pet-factory.ts

import { Cat } from './cat.model';
import { Dog } from './dog.model';
import { Pet } from './pet.model';
import { Rabbit } from './rabbit.model';


export class PetFactory
{
    static createPet(type: string, id: string, name: string, specificAttribute: any): Pet
    {
        switch (type.toLowerCase())
        {
            case 'dog':
                return new Dog(id, name, specificAttribute);
            case 'cat':
                return new Cat(id, name, specificAttribute);
            case 'rabbit':
                return new Rabbit(id, name, specificAttribute);
            default:
                throw new Error(`Unknown pet type: ${type}`);
        }
    }
}