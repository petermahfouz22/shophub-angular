// services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { Url } from '../urls.environment';
import {
  LoginResponse,
  GoogleAuthResponse,
  ForgotPasswordResponse,
  ResetPasswordResponse,
} from '../interfaces/auth';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${Url.apiUrl}/auth`;
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private currentUser = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.checkExistingAuth();
  }

  // ============ REGISTRATION & LOGIN ============
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: {
    email: string;
    password: string;
    rememberMe: boolean;
  }): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap((response) => {
          if (response.success && response.token) {
            this.setAuthData(
              response.token,
              response.user,
              credentials.rememberMe
            );
          }
        }),
        catchError((error) => {
          this.clearAuthData();
          return throwError(() => error);
        })
      );
  }

  // ============ GOOGLE AUTH ============
  googleLogin(): Observable<GoogleAuthResponse> {
    return this.http.get<GoogleAuthResponse>(`${this.apiUrl}/google`);
  }

  handleGoogleCallback(code: string): Observable<LoginResponse> {
    return this.http
      .get<LoginResponse>(`${this.apiUrl}/google/callback?code=${code}`)
      .pipe(
        tap((response) => {
          if (response.success && response.token) {
            this.setAuthData(response.token, response.user, true);
          }
        }),
        catchError((error) => {
          this.clearAuthData();
          return throwError(() => error);
        })
      );
  }

  // ============ PASSWORD RESET ============
  forgotPassword(email: string): Observable<ForgotPasswordResponse> {
    return this.http.post<ForgotPasswordResponse>(
      `${this.apiUrl}/forgot-password`,
      { email }
    );
  }

  resetPassword(data: {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
  }): Observable<ResetPasswordResponse> {
    return this.http.post<ResetPasswordResponse>(
      `${this.apiUrl}/reset-password`,
      data
    );
  }

  // ============ PROFILE MANAGEMENT ============
  updateProfile(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-profile`, data).pipe(
      tap((response: any) => {
        if (response.success && response.user) {
          localStorage.setItem('user_data', JSON.stringify(response.user));
          sessionStorage.setItem('user_data', JSON.stringify(response.user));
          this.currentUser.next(response.user);
        }
      })
    );
  }

  // ============ AUTH STATE MANAGEMENT ============
  setAuthData(token: string, user: User, rememberMe: boolean): void {
    const storage = rememberMe ? localStorage : sessionStorage;

    storage.setItem('auth_token', token);
    storage.setItem('user_data', JSON.stringify(user));

    this.isAuthenticated.next(true);
    this.currentUser.next(user);

    console.log('✅ Authentication data set successfully', {
      user: user.name,
      hasToken: !!token,
      storage: rememberMe ? 'localStorage' : 'sessionStorage',
    });
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated.value;
  }

  getCurrentUser(): User | null {
    return this.currentUser.value;
  }

  getCurrentUserObservable(): Observable<User | null> {
    return this.currentUser.asObservable();
  }

  getAuthState(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  getToken(): string | null {
    return (
      localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token')
    );
  }

  // ============ LOGOUT ============
  logout(): void {
    const token = this.getToken();
    if (token) {
      this.http
        .post(
          `${this.apiUrl}/logout`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .subscribe({
          next: () => console.log('✅ Logout request sent to server'),
          error: (error) => console.error('❌ Logout request failed:', error),
        });
    }

    this.clearAuthData();
    this.router.navigate(['/login']);
  }

  // ============ PRIVATE METHODS ============
  private checkExistingAuth(): void {
    const token = this.getToken();
    const userData =
      localStorage.getItem('user_data') || sessionStorage.getItem('user_data');

    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        this.isAuthenticated.next(true);
        this.currentUser.next(user);
        console.log('✅ Existing auth found:', user.name);
      } catch (error) {
        console.error('Error parsing user data:', error);
        this.clearAuthData();
      }
    } else {
      console.log('ℹ️ No existing auth found');
    }
  }

  private clearAuthData(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('user_data');

    this.isAuthenticated.next(false);
    this.currentUser.next(null);

    console.log('🚪 Auth data cleared');
  }
}
