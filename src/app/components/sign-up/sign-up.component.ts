import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomToasterService } from '../../services/custom-toaster.service';
import { AuthService } from '../../services/auth.service';
import { SignUp } from '../../models/Auth/SignUp';
import { APP_AUTH_CONST, NullResponseErrorMessage, SingUpMessage } from '../../consts/message';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signUpform!: FormGroup;

  constructor(
    private router: Router,
    private toastr: CustomToasterService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.userIsLogin()) {
      this.router.navigate(['/']);
    }
    this.createSignUpForm();
  }

  onSignUpClick(): void {
    this.signUpform?.markAllAsTouched();
    if (this.signUpform?.valid) {
      const signUp = this.signUpform.getRawValue() as SignUp;
      if (signUp.password !== signUp.confirmPassword) {
        this.toastr.showError("Error", "Passwords do not match.");
        return;
      }
      this.authService.signUp(signUp).subscribe({
        next: (res: any) => {
          if (res) {
            this.toastr.showSuccess("Success", SingUpMessage);
            this.router.navigate(['/home']);
            this.authService.setValueInStorage(APP_AUTH_CONST, res);
            this.signUpform.reset();
          } else {
            this.toastr.showError("Error", NullResponseErrorMessage);
          }
        }
      });
    }
  }

  private createSignUpForm() {
    const PasswordStrengthValidator = (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';
      if (!value) return null;

      const upperCaseCharacters = /[A-Z]+/g;
      if (!upperCaseCharacters.test(value)) {
        return { passwordStrength: `Text has to contain uppercase characters, current value: ${value}` };
      }

      const lowerCaseCharacters = /[a-z]+/g;
      if (!lowerCaseCharacters.test(value)) {
        return { passwordStrength: `Text has to contain lowercase characters, current value: ${value}` };
      }

      const numberCharacters = /[0-9]+/g;
      if (!numberCharacters.test(value)) {
        return { passwordStrength: `Text has to contain number characters, current value: ${value}` };
      }

      const specialCharacters = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+/g;
      if (!specialCharacters.test(value)) {
        return { passwordStrength: `Text has to contain special characters, current value: ${value}` };
      }
      return null;
    };

    this.signUpform = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      userName: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, PasswordStrengthValidator]),
      confirmPassword: new FormControl('', Validators.required)
    });
  }
}
