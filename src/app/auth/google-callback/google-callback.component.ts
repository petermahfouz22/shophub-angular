// google-callback.component.ts
import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-google-callback',
  imports: [CommonModule],
  templateUrl: './google-callback.component.html',
})
export class GoogleCallbackComponent implements OnInit {
  status: 'loading' | 'success' | 'error' = 'loading';
  currentStep = 1;
  countdown = 3;
  private countdownInterval: any;
  private stepInterval: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.startStepAnimation();
    this.processGoogleCallback();
  }

  private startStepAnimation(): void {
    this.stepInterval = setInterval(() => {
      if (this.status === 'loading' && this.currentStep < 3) {
        this.currentStep++;
      }
    }, 1000);
  }

  private processGoogleCallback(): void {
    this.route.queryParams.subscribe((params) => {
      const code = params['code'];
      const error = params['error'];

      console.log('🔐 Google Callback - Code:', code);

      if (error) {
        this.handleError('Google OAuth error: ' + error);
        return;
      }

      if (code) {
        this.exchangeCodeForToken(code);
      } else {
        this.handleError('No authorization code received from Google');
      }
    });
  }

  private exchangeCodeForToken(code: string): void {
    this.authService.handleGoogleCallback(code).subscribe({
      next: (response) => {
        console.log('✅ Google authentication successful:', response);
        this.handleSuccess();
      },
      error: (error) => {
        console.error('❌ Google authentication failed:', error);
        this.handleError('Failed to authenticate with Google');
      },
    });
  }

  private handleSuccess(): void {
    clearInterval(this.stepInterval);
    this.currentStep = 3;
    this.status = 'success';

    // بدء العد التنازلي للتوجيه إلى الـ profile
    this.startCountdown();
  }

  private handleError(message: string): void {
    clearInterval(this.stepInterval);
    this.status = 'error';
    console.error('❌', message);
  }

  private startCountdown(): void {
    this.countdownInterval = setInterval(() => {
      this.countdown--;

      if (this.countdown <= 0) {
        clearInterval(this.countdownInterval);
        this.router.navigate(['/profile']);
      }
    }, 1000);
  }

  getStatusMessage(): string {
    switch (this.status) {
      case 'loading':
        return 'جاري إكمال عملية التسجيل';
      case 'success':
        return 'مرحباً بعودتك!';
      case 'error':
        return 'لم نتمكن من تسجيل الدخول';
      default:
        return 'جاري المعالجة';
    }
  }

  getStatusDescription(): string {
    switch (this.status) {
      case 'loading':
        return 'نقوم بإنهاء إجراءات الأمان وتجهيز حسابك';
      case 'success':
        return 'تم تسجيل الدخول بنجاح إلى حسابك';
      case 'error':
        return 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى';
      default:
        return 'جاري معالجة طلبك';
    }
  }

  retry(): void {
    this.router.navigate(['/login']);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
    if (this.stepInterval) {
      clearInterval(this.stepInterval);
    }
  }
}
