import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  isSubmitting = false;
  showPassword = false;
  errorMessage = '';
  private authSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    
    // Redirect if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  private initializeForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50)
      ]],
      rememberMe: [false]
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
    return control ? control.hasError(errorName) && (control.dirty || control.touched) : false;
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
      return `${this.getFieldLabel(controlName)} must be at least ${minLength} characters`;
    }

    if (control.hasError('maxlength')) {
      const maxLength = control.errors['maxlength'].requiredLength;
      return `${this.getFieldLabel(controlName)} cannot exceed ${maxLength} characters`;
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
    // Reset error message
    this.errorMessage = '';

    // Mark all fields as touched to trigger validation messages
    this.markFormGroupTouched();

    if (this.loginForm.valid) {
      this.isSubmitting = true;

      const loginData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
        rememberMe: this.loginForm.value.rememberMe
      };

      // Call authentication service
      this.authSubscription = this.authService.login(loginData).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          
          // Handle successful login
          this.handleSuccessfulLogin(response);
        },
        error: (error) => {
          this.isSubmitting = false;
          this.handleLoginError(error);
        }
      });

    } else {
      console.log('Form is invalid');
      this.errorMessage = 'Please fix the validation errors above.';
    }
  }

  private handleSuccessfulLogin(response: any): void {
    console.log('Login successful:', response);
    
    // Show success message (you can use a toast service here)
    this.showSuccessMessage('Login successful! Redirecting...');

    // Navigate based on user role or default route
    this.navigateAfterLogin();
  }

  private handleLoginError(error: any): void {
    console.error('Login error:', error);
    
    // Set appropriate error message based on error type
    if (error.status === 401) {
      this.errorMessage = 'Invalid email or password. Please try again.';
    } else if (error.status === 403) {
      this.errorMessage = 'Your account has been suspended. Please contact support.';
    } else if (error.status === 0) {
      this.errorMessage = 'Network error. Please check your connection and try again.';
    } else {
      this.errorMessage = 'An unexpected error occurred. Please try again later.';
    }

    // Clear password field for security
    this.loginForm.patchValue({ password: '' });
    this.password?.markAsUntouched();
  }

  private navigateAfterLogin(): void {
    // Get user role from auth service
    const userRole = this.authService.getUserRole();
    
    // Navigate based on role
    switch (userRole) {
      case 'admin':
        this.router.navigate(['/admin/dashboard']);
        break;
      case 'vendor':
        this.router.navigate(['/vendor/dashboard']);
        break;
      default:
        this.router.navigate(['/dashboard']);
    }
  }

  private showSuccessMessage(message: string): void {
    // You can implement a toast service here
    console.log(message);
    // Example: this.toastService.success(message);
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  // Social login methods
  onGoogleLogin(): void {
    this.isSubmitting = true;
    console.log('Google login clicked');
    
    // Implement Google OAuth
    this.authService.googleLogin().subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.handleSuccessfulLogin(response);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.handleLoginError(error);
      }
    });
  }

  onGitHubLogin(): void {
    this.isSubmitting = true;
    console.log('GitHub login clicked');
    
    // Implement GitHub OAuth
    this.authService.githubLogin().subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.handleSuccessfulLogin(response);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.handleLoginError(error);
      }
    });
  }

  // Reset form
  resetForm(): void {
    this.loginForm.reset({
      email: '',
      password: '',
      rememberMe: false
    });
    this.errorMessage = '';
  }

  // Forgot password handler
  onForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }
}