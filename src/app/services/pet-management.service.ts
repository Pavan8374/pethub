import { DOCUMENT } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { petManagement } from "../consts/const";
import { Observable, tap } from "rxjs";
import { Global } from "../shared/global";
import { AddPet } from "../models/pet-management/AddPet";
import { GetPetsResponse } from "../models/pet-management/GetPetsByFilter";

@Injectable({
    providedIn: 'root',
})

export class PetManagementService {

    private http = inject(HttpClient);


    addPet(addPet: AddPet): Observable<any> {
        return this.http
            .post<any>(`${Global.WebUrl}${petManagement.addPet}`, addPet)
            .pipe(
                tap((res: any) => {
                    return res;
                })
            );
    }

    updatePet(id: string, addPet: AddPet): Observable<any> {
        return this.http
            .put<any>(`${Global.WebUrl}${petManagement.updatePet}${id}`, addPet)
            .pipe(
                tap((res: any) => {
                    return res;
                })
            );
    }

    removePet(id: string): Observable<any> {
        return this.http
            .delete<any>(`${Global.WebUrl}${petManagement.removePet}${id}`)
            .pipe(
                tap((res: any) => {
                    return res;
                })
            );
    }

    adoptPet(data: any): Observable<any> {
        return this.http
            .put<any>(`${Global.WebUrl}${petManagement.adoptPet}`, data)
            .pipe(
                tap((res: any) => {
                    return res;
                })
            );
    }

    getPetsByFilter(data: any): Observable<GetPetsResponse> {

        return this.http
        .get<GetPetsResponse>(`${Global.WebUrl}${petManagement.getPetsByFilter}${data}`, )
    }
    

}