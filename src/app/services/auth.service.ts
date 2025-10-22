import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { Url } from '../urls.environment';

interface LoginResponse {
  success: boolean;
  token: string;
  user: User;
  message?: string;
}

interface GoogleAuthResponse {
  success: boolean;
  url: string;
  message?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${Url.apiUrl}auth`;
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private currentUser = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.checkExistingAuth();
  }

  register(userData: any): Observable<any> {
    console.log(userData);
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // Regular email/password login
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

  // Get authentication state as observable
  getAuthState(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }
  googleLogin(): Observable<GoogleAuthResponse> {
    return this.http.get<GoogleAuthResponse>(`${this.apiUrl}/google`);
  }

  // معالجة الـ callback من Google
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

  // حفظ بيانات المصادقة
  setAuthData(token: string, user: User, rememberMe: boolean): void {
    const storage = rememberMe ? localStorage : sessionStorage;

    storage.setItem('auth_token', token);
    storage.setItem('user_data', JSON.stringify(user));

    this.isAuthenticated.next(true);
    this.currentUser.next(user);

    console.log('✅ Authentication data saved:', user.name);
  }

  // التحقق من المصادقة
  isLoggedIn(): boolean {
    return this.isAuthenticated.value;
  }

  getCurrentUser(): User | null {
    return this.currentUser.value;
  }

  getCurrentUserObservable(): Observable<User | null> {
    return this.currentUser.asObservable();
  }

  getToken(): string | null {
    return (
      localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token')
    );
  }

  // تسجيل الخروج
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
        .subscribe();
    }

    this.clearAuthData();
    this.router.navigate(['/login']);
  }

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
