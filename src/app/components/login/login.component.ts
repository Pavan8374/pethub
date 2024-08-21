import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../models/Users/user.model';
import { UserService } from '../../services/user.service';
import { CustomToasterService } from '../../services/custom-toaster.service';
import { CommonModule } from '@angular/common';
import { LogIn } from '../../models/Auth/LogIn';
import { AuthService } from '../../services/auth.service';
import { APP_AUTH_CONST, LogInMessage, NullResponseErrorMessage } from '../../consts/message';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,
    RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {
  user: User = new User;
  users: User[] = [];
  logInForm!: FormGroup;

  constructor(private userService: UserService,
    private router: Router,
    private toastr: CustomToasterService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.userIsLogin()) {
      this.router.navigate(['/']);
    }
    this.createLoginForm()
  }

  onClickLogIn(){

    this.users = this.userService.getUsers();
    let user = this.users.find(u => u.email === this.user.email);
    if(user?.password == this.user.password && user != null){
      this.toastr.showSuccess("Log in",'User login successfully');
      this.router.navigate(['/home']);
    }

    else {
      this.toastr.showError("Error",'Entered email or password incorrect');
    }

  }

  onLoginClick(): void {
    debugger;
    if (this.logInForm.valid) {
      //this.loading = true
      this.authService.logIn(this.logInForm.value).subscribe({
        next: (res: any) => {
          if (res) {
            //this.loading = false;
            this.authService.setValueInStorage(APP_AUTH_CONST, res);
            //this.dialog.closeAll();
            this.toastr.showSuccess("Success", LogInMessage);
            this.router.navigate(['/home']);
            this.logInForm.reset();
          } else {
            //this.loading = false;
            this.toastr.showError("Error", NullResponseErrorMessage);
          }
        },
        error: (err: any) => {
          //this.loading = false;
          this.toastr.showError("Error", err.error.message);
        }
      })
    }
  }

  private createLoginForm(): void {
    const PasswordStrengthValidator = function (
      control: AbstractControl
    ): ValidationErrors | null {
      let value: string = control.value || '';
      if (!value) {
        return null;
      }
      let upperCaseCharacters = /[A-Z]+/g;
      if (upperCaseCharacters.test(value) === false) {
        return {
          passwordStrength: `text has to contine Upper case characters,current value ${value}`,
        };
      }
      let lowerCaseCharacters = /[a-z]+/g;
      if (lowerCaseCharacters.test(value) === false) {
        return {
          passwordStrength: `text has to contine lower case characters,current value ${value}`,
        };
      }
      let numberCharacters = /[0-9]+/g;
      if (numberCharacters.test(value) === false) {
        return {
          passwordStrength: `text has to contine number characters,current value ${value}`,
        };
      }
      let specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
      if (specialCharacters.test(value) === false) {
        return {
          passwordStrength: `text has to contine special character,current value ${value}`,
        };
      }
      return null;
    };

    this.logInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, PasswordStrengthValidator]),
    });
  }
}
