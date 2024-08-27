import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CustomToasterService } from '../../services/custom-toaster.service';
import { CommonModule } from '@angular/common';
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
  logInForm!: FormGroup;
  public router = inject(Router);
  private toastr = inject(CustomToasterService);
  private authService =inject(AuthService);

  ngOnInit(): void {
    if (this.authService.userIsLogin()) {
      this.router.navigate(['/']);
    }
    this.createLoginForm()
  }

  onLoginClick(): void {
    if (this.logInForm.invalid) {
      this.toastr.showError("", "Please fill required fields.");
      this.logInForm.markAllAsTouched(); // This will mark all controls as touched to trigger validation messages
      return;
    }
  
    if (this.logInForm.valid) {
      this.authService.logIn(this.logInForm.value).subscribe({
        next: (res: any) => {
          if (res) {
            const token = res.token;
            this.authService.setValueInStorage(APP_AUTH_CONST, token);
            this.toastr.showSuccess("", LogInMessage);

            // Decode the token and check the role
            if (this.authService.hasRole(token, 'Admin')) {
              this.router.navigate(['/admin/dashboard']);
            } else {
              this.router.navigate(['/home']);
            }
            this.logInForm.reset();
          } else {
            this.toastr.showError("", NullResponseErrorMessage);
          }
        },
        error: (err: any) => {
          this.toastr.showError("", err.error.message);
        }
      });
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
