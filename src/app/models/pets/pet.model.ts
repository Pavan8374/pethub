// src/app/models/pet.model.ts

export abstract class Pet
{
    constructor(
        public id: string,
        public name: string,
        public type: string,
        public health: number = 100,
        public happiness: number = 50,
        public hunger: number = 0,
        public energy: number = 100,
        public age: number = 0
    ) { }

    abstract makeSound(): string;

    feed(): void
    {
        this.hunger = Math.max(0, this.hunger - 20);
        this.health = Math.min(100, this.health + 5);
        this.happiness = Math.min(100, this.happiness + 5);
    }

    play(): void
    {
        this.happiness = Math.min(100, this.happiness + 15);
        this.energy = Math.max(0, this.energy - 20);
        this.hunger = Math.min(100, this.hunger + 10);
    }

    rest(): void
    {
        this.energy = Math.min(100, this.energy + 25);
        this.health = Math.min(100, this.health + 5);
        this.hunger = Math.max(0, this.hunger - 5);
    }

    petAge(): void
    {
        this.age++;
        if (this.age % 10 === 0)
        {
            this.energy = Math.max(0, this.energy - 1);
        }
    }

    get wellBeing(): number
    {
        return (
            (this.health + this.happiness + (100 - this.hunger) + this.energy) / 4
        );
    }
}
