import { Component, inject, Injectable } from '@angular/core';
import { petManagement } from '../../../../consts/const';
import { PetManagementService } from '../../../../services/pet-management.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomToasterService } from '../../../../services/custom-toaster.service';
import { AddPetMessage, NullResponseErrorMessage } from '../../../../consts/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-pet',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-pet.component.html',
  styleUrl: './add-pet.component.css'
})

@Injectable({
  providedIn: 'root',
})
export class AddPetComponent {
  addPetForm!: FormGroup;

  petService = inject(PetManagementService);
  private toastr = inject(CustomToasterService);
  private router = inject(Router);
  
  ngOnInit(): void {
    this.createAddPetForm();
    petManagement.addPet
  }

  onAddPetSubmit(): void {
    if (this.addPetForm.invalid) {
      this.toastr.showError("", "Please fill required fields.");
      this.addPetForm.markAllAsTouched(); // This will mark all controls as touched to trigger validation messages
      return;
    }
  try{
    if (this.addPetForm.valid) {
      this.petService.addPet(this.addPetForm.value).subscribe({
        next: (res: any) => {
          if (res) {
            this.toastr.showSuccess("", AddPetMessage);
            this.router.navigate(['/admin/pets']);
            this.addPetForm.reset();
          } else {
            this.toastr.showError("", NullResponseErrorMessage);
          }
        },
        error: (err: any) => {
          this.toastr.showError("", err.error.message);
        }
      });
    }
  }
  catch(e) {
    this.toastr.showError("", "Catched an unknown error!");
    console.log(e); 
  }
    
  }

  onCancel(): void {
    this.router.navigate(['/admin/pets']); // Adjust this as per your routing setup
    this.addPetForm.reset();
  }

  private createAddPetForm(): void {
    this.addPetForm = new FormGroup({
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
}
