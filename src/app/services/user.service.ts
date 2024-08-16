import { Injectable } from "@angular/core";
import { User } from "../models/Users/user.model";

@Injectable({
    providedIn: 'root'
  })
  export class UserService {
  
    getUsers(): User[] {
      return this.getUsersFromLocalStorage();
    }
  
    private getUsersFromLocalStorage(): User[] {
      const usersData = localStorage.getItem('users');
      return usersData ? JSON.parse(usersData) : [];
    }
  }