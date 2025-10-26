// components/reset-password/reset-password.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit {
  token: string = '';
  email: string = '';
  password: string = '';
  passwordConfirmation: string = '';
  loading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'] || '';
      this.email = params['email'] || '';

      if (!this.token || !this.email) {
        this.errorMessage =
          'Invalid reset link. Please request a new password reset.';
      }
    });
  }

  onSubmit(): void {
    if (this.password !== this.passwordConfirmation) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    const resetData = {
      token: this.token,
      email: this.email,
      password: this.password,
      password_confirmation: this.passwordConfirmation,
    };

    this.authService.resetPassword(resetData).subscribe({
      next: (response: any) => {
        this.loading = false;
        if (response.success) {
          this.successMessage =
            response.message ||
            'Password has been reset successfully! Redirecting to login...';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        } else {
          this.errorMessage = response.message || 'Failed to reset password.';
        }
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage =
          error.error?.message || 'Failed to reset password. Please try again.';
      },
    });
  }
}
