// sign-up.component.ts
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../services/user.model';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  user: User = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  constructor(private router: Router) {}
  register() {
    if (this.user.password === this.user.confirmPassword) {
      this.saveUserToLocalStorage(this.user);
      console.log('User registered successfully');
      this.router.navigate(['/home']);
    } else {
      console.error('Passwords do not match');
    }
  }

  getUsers() {
    const users = this.getUsersFromLocalStorage();
    console.log('All users:', users);
  }

  private saveUserToLocalStorage(user: User) {
    const users = this.getUsersFromLocalStorage();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  }

  private getUsersFromLocalStorage(): User[] {
    const usersData = localStorage.getItem('users');
    return usersData ? JSON.parse(usersData) : [];
  }
}
