import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-contact-us',
  imports: [ ReactiveFormsModule,CommonModule],
  templateUrl: './contact-us.component.html',

})
export class ContactUsComponent {
  contactForm: FormGroup;
  isLoading = signal(false);
  isSubmitted = signal(false);

  // Contact information
  contactInfo = {
    phone: '+1 (555) 123-4567',
    email: 'support@shophub.com',
    address: '123 Commerce Street, Business City, BC 12345',
    workingHours: 'Mon - Fri: 9:00 AM - 6:00 PM',
  };

  constructor(private fb: FormBuilder) {
    this.contactForm = this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern('^[+]?[0-9\\s-()]{10,}$')]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(1000),
        ],
      ],
      contactMethod: ['email', Validators.required],
    });
  }

  // Form field getters for easy access in template
  get fullName() {
    return this.contactForm.get('fullName');
  }
  get email() {
    return this.contactForm.get('email');
  }
  get phone() {
    return this.contactForm.get('phone');
  }
  get subject() {
    return this.contactForm.get('subject');
  }
  get message() {
    return this.contactForm.get('message');
  }
  get contactMethod() {
    return this.contactForm.get('contactMethod');
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isLoading.set(true);

      // Simulate API call
      setTimeout(() => {
        console.log('Form submitted:', this.contactForm.value);
        this.isLoading.set(false);
        this.isSubmitted.set(true);
        this.contactForm.reset();
        this.contactForm.get('contactMethod')?.setValue('email');

        // Reset success message after 5 seconds
        setTimeout(() => {
          this.isSubmitted.set(false);
        }, 5000);
      }, 2000);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.contactForm.controls).forEach((key) => {
      const control = this.contactForm.get(key);
      control?.markAsTouched();
    });
  }

  // Error messages for form validation
  getErrorMessage(controlName: string): string {
    const control = this.contactForm.get(controlName);

    if (control?.errors?.['required'] && control.touched) {
      return 'This field is required';
    }

    if (
      controlName === 'email' &&
      control?.errors?.['email'] &&
      control.touched
    ) {
      return 'Please enter a valid email address';
    }

    if (
      controlName === 'fullName' &&
      control?.errors?.['minlength'] &&
      control.touched
    ) {
      return 'Name must be at least 2 characters long';
    }

    if (
      controlName === 'subject' &&
      control?.errors?.['minlength'] &&
      control.touched
    ) {
      return 'Subject must be at least 5 characters long';
    }

    if (
      controlName === 'message' &&
      control?.errors?.['minlength'] &&
      control.touched
    ) {
      return 'Message must be at least 10 characters long';
    }

    if (
      controlName === 'phone' &&
      control?.errors?.['pattern'] &&
      control.touched
    ) {
      return 'Please enter a valid phone number';
    }

    return '';
  }
}
