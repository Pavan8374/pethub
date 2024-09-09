import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetPetsResponse, Pets } from '../../models/pet-management/GetPetsByFilter';
import { PetManagementService } from '../../services/pet-management.service';
import { CustomToasterService } from '../../services/custom-toaster.service';

@Component({
  selector: 'app-adoption-center',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './adoption-center.component.html',
  styleUrls: ['./adoption-center.component.css']
})
export class AdoptionCenterComponent {
  pets: Pets[] = [];
  visiblePets: Pets[] = [];
  currentIndex: number = 0;
  SearchField: number = 0;
  SearchString: string = "";
  isAdopted: boolean = false;
  
  private petManagement = inject(PetManagementService);
  private toastr = inject(CustomToasterService);

  ngOnInit() {
    this.getAvailablePets();
  }

  getAvailablePets() {
    //this.SearchField = 1;
    this.SearchString = "Dog"
    let params = `${'?SearchField=Species'+'&SearchString='+(this.SearchString)+'&IsAdopted='+(this.isAdopted) +'&PageNumber=1&PageSize=10'}`
    this.petManagement.getPetsByFilter(params).subscribe(
      (response: GetPetsResponse) => {
        this.pets = response.data;
        this.updateVisiblePets();
      },
      (error) => {
        console.error('Error fetching pets:', error);
        this.toastr.showError("", "Failed to fetch pets. Please try again.");
      }
    );
  }

  updateVisiblePets() {
    this.visiblePets = this.pets.slice(this.currentIndex, this.currentIndex + 3);
  }

  slideLeft() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateVisiblePets();
    }
  }

  slideRight() {
    if (this.currentIndex < this.pets.length - 3) {
      this.currentIndex++;
      this.updateVisiblePets();
    }
  }
}
