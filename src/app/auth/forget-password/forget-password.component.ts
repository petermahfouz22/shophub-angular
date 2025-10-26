// components/forgot-password/forgot-password.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forget-password',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './forget-password.component.html',
})
export class ForgotPasswordComponent {
  email: string = '';
  loading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (!this.email) return;

    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.authService.forgotPassword(this.email).subscribe({
      next: (response: any) => {
        this.loading = false;
        if (response.success) {
          this.successMessage =
            response.message ||
            'Password reset link has been sent to your email address.';
          this.email = '';
        } else {
          this.errorMessage = response.message || 'Failed to send reset link.';
        }
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage =
          error.error?.message ||
          'Failed to send reset link. Please try again.';
      },
    });
  }
}
