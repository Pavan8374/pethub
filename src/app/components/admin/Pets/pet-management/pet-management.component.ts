import { Component, inject, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PetManagementService } from '../../../../services/pet-management.service';
import { GetPetsResponse, Pets } from '../../../../models/pet-management/GetPetsByFilter';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomToasterService } from '../../../../services/custom-toaster.service';
import { NullResponseErrorMessage, PageSize, RemovePetMessage } from '../../../../consts/message';
import { debounceTime, Subject } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';

// Define enum for search fields
enum PetSearchKeyWord {
  Name = 'Name',
  Species = 'Species',
  Breed = 'Breed'
}

@Component({
  selector: 'app-pet-management',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatIconModule
  ],
  templateUrl: './pet-management.component.html',
  styleUrls: ['./pet-management.component.css']
})

@Injectable({
  providedIn: 'root',
})

export class PetManagementComponent implements OnInit {
  pets: Pets[] = [];
  searchString: string = '';
  isAdopted: boolean = false;
  pageNumber: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  isLoading: boolean = false;
  searchField: PetSearchKeyWord = PetSearchKeyWord.Name; // Set default value
  searchSubject: Subject<string> = new Subject<string>();
  totalRecords!: number;

  // Expose the enum to the template
  PetSearchKeyWord = PetSearchKeyWord;

  private router = inject(Router);
  private petManagementService = inject(PetManagementService);
  private toastr = inject(CustomToasterService);

  ngOnInit() {
    this.setupSearchObservable();
    this.getPets();
  }

  onAddPet() {
    this.router.navigate(['/admin/pets/add']);
  }

  onUpdatePet(id: string) {
    this.router.navigate(['/admin/pets/edit', id]);
  }

  onRemovePet(id: string) {
    if (id) {
      this.petManagementService.removePet(id).subscribe({
        next: (res: any) => {
          if (res) {
            this.toastr.showSuccess("", RemovePetMessage);
            this.getPets();
          } else {
            this.toastr.showError("", NullResponseErrorMessage);
          }
        },
        error: (err: any) => {
          this.toastr.showError("", err.error.message);
        }
      });
    } else {
      this.toastr.showError("", NullResponseErrorMessage);
    }
  }

  setupSearchObservable() {
    this.searchSubject.pipe(
      debounceTime(700)
    ).subscribe(() => {
      this.getPets();
    });
  }

  onSearchInput() {
    this.searchSubject.next(this.searchString);
  }

  onSearchFieldChange() {
    this.pageNumber = 1;
    this.getPets();
  }

  onIsAdoptedChange() {
    this.pageNumber = 1;
    this.getPets();
  }

  getPets() {
    this.isLoading = true;

    // Map searchField to its API-friendly format
    const searchFieldParam = this.searchField;

    const params = `?SearchField=${searchFieldParam}&SearchString=${this.searchString}&IsAdopted=${this.isAdopted}&PageNumber=${this.pageNumber}&PageSize=${this.pageSize}`;

    this.petManagementService.getPetsByFilter(params).subscribe(
      (response: GetPetsResponse) => {
        this.pets = response.data;
        this.totalPages = response.totalPages;
        this.isLoading = false;
        this.totalRecords = response.totalRecords;
      },
      (error) => {
        console.error('Error fetching pets:', error);
        this.isLoading = false;
        this.toastr.showError("", "Failed to fetch pets. Please try again.");
      }
    );
  }

  onPageChange(page: number) {
    this.pageNumber = page;
    this.getPets();
  }

  getGenderIcon(gender: string): string {
    return gender.toLowerCase() === 'male' ? '♂' : '♀';
  }

  objectKeys(obj: any): (keyof typeof PetSearchKeyWord)[] {
    return Object.keys(obj).filter(key => isNaN(Number(key))) as (keyof typeof PetSearchKeyWord)[];
  }
  
  
}
