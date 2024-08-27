import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomToasterService } from '../../../../services/custom-toaster.service';
import { ActivatedRoute, Router } from '@angular/router';
import { petManagement } from '../../../../consts/const';
import { PetManagementService } from '../../../../services/pet-management.service';
import { EditPetMessage, NullResponseErrorMessage } from '../../../../consts/message';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-pet',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './edit-pet.component.html',
  styleUrl: './edit-pet.component.css'
})
export class EditPetComponent {
  editPetForm!: FormGroup;
  petId!: string;
  private toastr = inject(CustomToasterService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private petService = inject(PetManagementService);

  ngOnInit(): void {
    this.createEditPetForm();
    const petId = this.route.snapshot.paramMap.get('id'); // Get the ID from the URL
    if (petId) {
      this.loadPetData(petId);
    }
  }

  private createEditPetForm(): void {
    this.editPetForm = new FormGroup({
      id: new FormControl(''), // Hidden field to store ID
      petName: new FormControl('', Validators.required),
      species: new FormControl('', Validators.required),
      breed: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      color: new FormControl('', Validators.required),
      weight: new FormControl(''),
      age: new FormControl(''),
      microchipNumber: new FormControl(''),
      dateofBirth: new FormControl('')
    });
  }

  private loadPetData(petId: string): void {
    this.petService.getPetsByFilter({}).subscribe((response: any) => {
      const pet = response.data.find((p: any) => p.id === petId); // Find the pet by ID
      if (pet) {
        this.editPetForm.patchValue({
          ...pet,
          gender: this.mapGenderToValue(pet.gender), // Map the gender to the dropdown value
          dateofBirth: pet.dateofBirth ? new Date(pet.dateofBirth).toISOString().substring(0, 10) : '' // Convert date to the required format (YYYY-MM-DD)
        });
      }
    });
  }

  private mapGenderToValue(gender: string): number {
    switch (gender.toLowerCase()) {
      case 'male':
        return 1;
      case 'female':
        return 2;
      case 'other':
        return 3;
      default:
        return 0; // Or handle as needed
    }
  }

  onEditPetSubmit(): void {
    if (this.editPetForm.invalid) {
      this.toastr.showError("", "Please fill required fields.");
      this.editPetForm.markAllAsTouched();
      return;
    }

    this.petService.updatePet(this.editPetForm.value.id, this.editPetForm.value).subscribe({
      next: (res: any) => {
        if (res) {
          this.toastr.showSuccess("", "Pet details updated successfully.");
          this.router.navigate(['/admin/pets']);
        } else {
          this.toastr.showError("", "Failed to update pet details.");
        }
      },
      error: (err: any) => {
        this.toastr.showError("", err.error.message);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/admin/pets']);
    this.editPetForm.reset();
  }

}
