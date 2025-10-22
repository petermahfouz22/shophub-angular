// sign-up.component.ts
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { SocialLoginComponent } from '../social-login/social-login.component';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, CommonModule, SocialLoginComponent],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signupForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.signupForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
        gender: ['', [Validators.required]],
        phone: [
          '',
          [Validators.required, Validators.pattern(/^[0-9+\-\s]{8,15}$/)],
        ],
        birthday: ['', [Validators.required]],
        address: ['', [Validators.required, Validators.minLength(5)]],
        acceptTerms: [false, [Validators.requiredTrue]],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  private passwordMatchValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    return password.value === confirmPassword.value
      ? null
      : { passwordMismatch: true };
  }

  get name() {
    return this.signupForm.get('name');
  }
  get email() {
    return this.signupForm.get('email');
  }
  get password() {
    return this.signupForm.get('password');
  }
  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }
  get acceptTerms() {
    return this.signupForm.get('acceptTerms');
  }

  // Error checking methods
  hasError(controlName: string, errorName: string): boolean {
    const control = this.signupForm.get(controlName);
    return control ? control.touched && control.hasError(errorName) : false;
  }

  getErrorMessage(controlName: string): string {
    const control = this.signupForm.get(controlName);

    if (!control || !control.errors) return '';

    if (control.hasError('required')) {
      return 'This field is required';
    }

    if (control.hasError('email')) {
      return 'Please enter a valid email address';
    }

    if (control.hasError('minlength')) {
      const minLength = control.errors['minlength']?.requiredLength;
      return `Must be at least ${minLength} characters long`;
    }

    if (control.hasError('pattern')) {
      if (controlName === 'password') {
        return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
      }
    }

    if (
      controlName === 'confirmPassword' &&
      this.signupForm.hasError('passwordMismatch')
    ) {
      return 'Passwords do not match';
    }

    return 'Invalid field';
  }

  // Password visibility toggles
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // Form submission
  onSubmit(): void {
    if (this.signupForm.invalid) {
      this.markAllFieldsAsTouched();
      return;
    }
    this.isSubmitting = true;
    this.authService
      .register({ ...this.signupForm.value })
      .subscribe((res) => console.log(res));
    console.log('Form submitted:', this.signupForm.value);

    // Simulate API call
    setTimeout(() => {
      this.isSubmitting = false;
      // Here you would typically:
      // 1. Send data to your backend
      // 2. Handle response
      // 3. Redirect to login or dashboard
      this.router.navigate(['/login']);
    }, 2000);
  }

  private markAllFieldsAsTouched(): void {
    Object.keys(this.signupForm.controls).forEach((key) => {
      const control = this.signupForm.get(key);
      control?.markAsTouched();
    });
  }
}
