import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { Animal } from "../models/pets/animal";
import { Global } from "../shared/global";
import { Routes } from "../consts/const";
import { inject, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class AdoptionCenterPageService{
    private _http = inject(HttpClient);

    getAllAnimals() : Observable <Animal[]>{

        return this._http.get<Animal[]>(`${Global.WebUrl}${Routes.getAllAnimals}`)
    }
}