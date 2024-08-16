import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../models/Users/user.model';
import { ToastrService } from 'ngx-toastr';

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
  constructor(
    private router: Router,
    private toastr: ToastrService  
  ) {}
  register() {
    if (this.user.password === this.user.confirmPassword) {
      this.saveUserToLocalStorage(this.user);
      this.toastr.success("You registered successfully")
      this.router.navigate(['/home']);
    } else {
      this.toastr.error("Passwords not Matching")
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
