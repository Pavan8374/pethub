import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CustomToasterService } from '../../services/custom-toaster.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  waitlistForm: FormGroup;

  private toastr = inject(CustomToasterService)


  constructor(private fb: FormBuilder) {
    // Initialize the reactive form with the email control and validation
    this.waitlistForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  // Handle form submission
  onSubmit() {
    if (this.waitlistForm.valid) {
      const email = this.waitlistForm.value.email;
      this.toastr.showSuccess("","You will be notified!");
    }
  }
}
