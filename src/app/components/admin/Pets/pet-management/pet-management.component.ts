import { Component, inject, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PetManagementService } from '../../../../services/pet-management.service';
import { GetPetsResponse, Pets } from '../../../../models/pet-management/GetPetsByFilter';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomToasterService } from '../../../../services/custom-toaster.service';
import { NullResponseErrorMessage, PageSize, RemovePetMessage } from '../../../../consts/message';
import { HttpParams } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-pet-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './pet-management.component.html',
  styleUrls: ['./pet-management.component.css']
})

@Injectable({
  providedIn: 'root',
})

export class PetManagementComponent implements OnInit {
  pets: Pets[] = [];
  //searchField: string = 'name';
  searchString: string = '';
  isAdopted: boolean = false;
  pageNumber: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  isLoading: boolean = false;
  searchField!: string;
  searchSubject: Subject<string> = new Subject<string>();
  activePageIndex: number = 0;
  activePageSize: number = PageSize;
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
            this.router.navigate(['/admin/pets']);
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
      this.router.navigate(['/admin/pets']);
    }
  }

  setupSearchObservable() {
    debugger;
    this.searchSubject.pipe(
      debounceTime(700) 
    ).subscribe((filterValue: any) => {
      let urlwithsearch = `${'?SearchString='+(filterValue)+'&PageNumber=1&PageSize='+PageSize}${this.searchField ? ('&SearchField=' + this.searchField) : ''}}`
      let urlwithoutsearch = `${'?PageNumber=1&PageSize=15'}${this.searchField ? ('&SearchField=' + this.searchField) : ''}}`
      this.petManagementService.getPetsByFilter(filterValue ? urlwithsearch : urlwithoutsearch).subscribe({
        next:(response:GetPetsResponse) => {
        //this.spinner.hide();
        //this.userDataSource = new MatTableDataSource(UserResponse.data);
        this.pets = response.data;
        this.totalPages = response.totalPages;
        this.isLoading = false;
        this.totalRecords = response.totalRecords;
        },
        error:(err:any) => {
        this.isLoading = false;
          this.toastr.showError("", NullResponseErrorMessage)   
        }
      })
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
    debugger;
    const params = new HttpParams()
      .set('SearchField', this.searchField)
      .set('SearchString', this.searchString)
      .set('IsAdopted', this.isAdopted.toString())
      .set('PageNumber', this.pageNumber.toString())
      .set('PageSize', this.pageSize.toString());
  
    this.petManagementService.getPetsByFilter(params).subscribe(
      (response: GetPetsResponse) => {
        this.pets = response.data;
        this.totalPages = response.totalPages;
        this.isLoading = false;
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
