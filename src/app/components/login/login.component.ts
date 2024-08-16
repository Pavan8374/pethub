import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../models/Users/user.model';
import { UserService } from '../../services/user.service';
import { Toast, ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,
    ReactiveFormsModule,
    RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {
  user: User = new User;
  users: User[] = [];
  

  constructor(private userService: UserService,
    private router: Router,
    private toastr: ToastrService

  ) {}


  onClickLogIn(){

    this.users = this.userService.getUsers();
    debugger;
    let user = this.users.find(u => u.email === this.user.email);
    if(user?.password == this.user.password && user != null){
      this.toastr.success('User login successfully');
      this.router.navigate(['/home']);
    }

    else {
      this.toastr.error('Entered email or password incorrect');
    }

  }
}
