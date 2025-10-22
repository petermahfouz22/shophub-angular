import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-social-login',
  imports: [],
  templateUrl: './social-login.component.html',
  styleUrl: './social-login.component.css',
})
export class SocialLoginComponent {
  loading = false;

  constructor(private authService: AuthService) {}

  continueWithGoogle() {
    this.loading = true;

    this.authService.googleLogin().subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success && response.url) {
          // التوجيه في نفس النافذة بدلاً من فتح نافذة جديدة
          window.location.href = response.url;
        }
      },
      error: (error) => {
        this.loading = false;
        console.error('Google login failed:', error);
        alert('فشل تسجيل الدخول عبر Google');
      },
    });
  }
}
