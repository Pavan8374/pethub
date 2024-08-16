import { Component } from '@angular/core';
import { User } from '../../models/Users/user.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  getUsers() {
    const users = this.getUsersFromLocalStorage();
    console.log('All users:', users);
  }
  private getUsersFromLocalStorage(): User[] {
    const usersData = localStorage.getItem('users');
    return usersData ? JSON.parse(usersData) : [];
  }
  
}
