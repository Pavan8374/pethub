import { Component, inject, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PetManagementService } from '../../../../services/pet-management.service';
import { GetPetsResponse, Pets } from '../../../../models/pet-management/GetPetsByFilter';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomToasterService } from '../../../../services/custom-toaster.service';
import { NullResponseErrorMessage, PageSize, RemovePetMessage } from '../../../../consts/message';
import { HttpParams } from '@angular/common/http';
import { debounceTime, Subject } from 'rxjs';

// Import Angular Material modules
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';

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
  searchField!: string;
  searchSubject: Subject<string> = new Subject<string>();
  totalRecords!: number;

  private router = inject(Router);
  private petManagementService = inject(PetManagementService);
  private toastr = inject(CustomToasterService);
  private route = inject(ActivatedRoute);

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
    ).subscribe((filterValue: string) => {
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
    debugger;
    this.isLoading = true;
    const params = new HttpParams()
      .set('SearchField', this.searchField || '') // Ensure empty string if not set
      .set('SearchString', this.searchString || '') // Ensure empty string if not set
      .set('IsAdopted', String(this.isAdopted)) // Convert boolean to string
      .set('PageNumber', this.pageNumber.toString()) // Convert number to string
      .set('PageSize', this.pageSize.toString()); // Convert number to string
  
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
}
