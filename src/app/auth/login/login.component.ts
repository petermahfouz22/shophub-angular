import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitting = false;
  showPassword = false;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(50),
        ],
      ],
      rememberMe: [false],
    });
  }

  // Getter methods for easy access in template
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get rememberMe() {
    return this.loginForm.get('rememberMe');
  }

  // Check if field has error
  hasError(controlName: string, errorName: string): boolean {
    const control = this.loginForm.get(controlName);
    return control
      ? control.hasError(errorName) && (control.dirty || control.touched)
      : false;
  }

  // Get error message for field
  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);

    if (!control || !control.errors) return '';

    if (control.hasError('required')) {
      return `${this.getFieldLabel(controlName)} is required`;
    }

    if (control.hasError('email')) {
      return 'Please enter a valid email address';
    }

    if (control.hasError('minlength')) {
      const minLength = control.errors['minlength'].requiredLength;
      return `${this.getFieldLabel(
        controlName
      )} must be at least ${minLength} characters`;
    }

    if (control.hasError('maxlength')) {
      const maxLength = control.errors['maxlength'].requiredLength;
      return `${this.getFieldLabel(
        controlName
      )} cannot exceed ${maxLength} characters`;
    }

    return 'Invalid value';
  }

  private getFieldLabel(controlName: string): string {
    const labels: { [key: string]: string } = {
      email: 'Email address',
      password: 'Password',
    };
    return labels[controlName] || controlName;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    // Mark all fields as touched to trigger validation messages
    this.markFormGroupTouched();

    if (this.loginForm.valid) {
      console.log(this.markFormGroupTouched());
      this.isSubmitting = true;

      // Simulate API call
      setTimeout(() => {
        console.log('Login successful:', this.loginForm.value);

        // Here you would typically:
        // 1. Call authentication service
        // 2. Store token/user data
        // 3. Navigate to dashboard/home

        this.isSubmitting = false;
        // this.router.navigate(['/']);
      }, 1500);
    } else {
      console.log('Form is invalid');
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach((key) => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  // Social login methods
  onGoogleLogin(): void {
    console.log('Google login clicked');
    // Implement Google OAuth
  }

  onGitHubLogin(): void {
    console.log('GitHub login clicked');
    // Implement GitHub OAuth
  }

  // Reset form
  resetForm(): void {
    this.loginForm.reset({
      email: '',
      password: '',
      rememberMe: false,
    });
  }
}
