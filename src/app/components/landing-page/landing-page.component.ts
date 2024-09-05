import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject } from '@angular/core';
import { CustomToasterService } from '../../services/custom-toaster.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  waitlistForm: FormGroup;

  private toastr = inject(CustomToasterService)
  private el=  inject(ElementRef);
  //private fb = inject(FormBuilder) 
  constructor(private fb: FormBuilder) {
    // Initialize the reactive form with the email control and validation
    this.waitlistForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  ngOnInit(): void {
    this.observeSections();
  }
  observeSections(): void {
    const options = {
      root: null,
      threshold: 0.2, // Trigger animation when 20% of the section is visible
    };
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.triggerFlipAnimation(entry.target);
        } else {
          this.resetFlipAnimation(entry.target); // Reset when not in view
        }
      });
    }, options);
  
    // Observe each section except footer
    const sections = this.el.nativeElement.querySelectorAll('section');
    sections.forEach((section: HTMLElement) => {
      observer.observe(section);
    });
  }
  
  // Apply the flip animation class to the section
  triggerFlipAnimation(section: Element): void {
    section.classList.add('flip-section');
  }
  
  // Reset the flip animation class
  resetFlipAnimation(section: Element): void {
    section.classList.remove('flip-section');
  }
  // Handle form submission
  onSubmit() {
    if (this.waitlistForm.valid) {
      const email = this.waitlistForm.value.email;
      this.toastr.showSuccess("","You will be notified!");
    }
  }
}
