import { Component, inject, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PetManagementService } from '../../../../services/pet-management.service';
import { GetPetsResponse, Pets } from '../../../../models/pet-management/GetPetsByFilter';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-pet-management',
  standalone: true,
  imports : [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './pet-management.component.html',
  styleUrls: ['./pet-management.component.css']
})

@Injectable({
  providedIn: 'root',
})

export class PetManagementComponent implements OnInit {
  pets: Pets[] = [];
  searchField: string = 'name';
  searchString: string = '';
  isAdopted: boolean = false;
  pageNumber: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  isLoading: boolean = false;
  
  private router = inject(Router);
  private petManagementService = inject(PetManagementService);

  ngOnInit() {
    this.getPets();
  }
  onAddPet() {
    this.router.navigate(['/admin/pets/add']);
  }

  onUpdatePet(id: string) {
    this.router.navigate(['/admin/pets/update', id]);
  }

  onRemovePet(id: string) {
    this.router.navigate(['/admin/pets/remove', id]);
  }

  
  getPets() {
    this.isLoading = true;
    const params = {
      SearchField: this.searchField,
      SearchString: this.searchString,
      IsAdopted: this.isAdopted,
      PageNumber: this.pageNumber,
      PageSize: this.pageSize,
    };

    this.petManagementService.getPetsByFilter(params).subscribe(
      (response: GetPetsResponse) => {
        this.pets = response.data;
        this.totalPages = response.totalPages;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching pets:', error);
        this.isLoading = false;
      }
    );
  }

  onSearch() {
    this.pageNumber = 1;
    this.getPets();
  }

  onPageChange(page: number) {
    this.pageNumber = page;
    this.getPets();
  }

  getGenderIcon(gender: string): string {
    return gender.toLowerCase() === 'male' ? '♂' : '♀';
  }

}
