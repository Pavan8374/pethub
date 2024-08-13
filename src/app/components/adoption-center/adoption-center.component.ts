import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdoptionCenterPageService } from '../../services/petservice';
import { Animal } from '../../models/pets/animal';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-adoption-center',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './adoption-center.component.html',
  styleUrls: ['./adoption-center.component.css']
})
export class AdoptionCenterComponent {
  allAnimals: any;
    private _adoptionCenterPageService = inject(AdoptionCenterPageService);
    private _spinner =  inject(NgxSpinnerService);


    ngOnInit() {
      this.getAnimals();
    }

  getAnimals(): void {
    this._spinner.show();
    this._adoptionCenterPageService.getAllAnimals().subscribe({
      next: (animalsResponse: Animal[]) => {
        this.allAnimals = animalsResponse;
        this._spinner.hide();;

      },
      error: (err: any) => {
        this._spinner.hide();;
      }
    });
  }

  adoptPet(pet: Animal): void {
    // For now, just remove the pet from the list
    this.allAnimals = this.allAnimals.filter((p: { id: number; }) => p.id !== pet.id);
    alert(`Congratulations! You've adopted ${pet.name}!`);
  }

}