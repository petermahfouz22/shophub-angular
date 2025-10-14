// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

interface LoginResponse {
  success: boolean;
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  message?: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://your-api-url.com/api/auth';
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private currentUser = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.checkExistingAuth();
  }

  // Regular email/password login
  login(credentials: { email: string; password: string; rememberMe: boolean }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response.success && response.token) {
          this.setAuthData(response.token, response.user, credentials.rememberMe);
        }
      }),
      catchError(error => {
        this.clearAuthData();
        return throwError(() => error);
      })
    );
  }

  // Google OAuth login
  googleLogin(): Observable<LoginResponse> {
    // This would typically redirect to Google OAuth
    // For demo, we'll simulate an API call
    return this.http.get<LoginResponse>(`${this.apiUrl}/google`).pipe(
      tap(response => {
        if (response.success && response.token) {
          this.setAuthData(response.token, response.user, true);
        }
      }),
      catchError(error => {
        this.clearAuthData();
        return throwError(() => error);
      })
    );
  }

  // GitHub OAuth login
  githubLogin(): Observable<LoginResponse> {
    // This would typically redirect to GitHub OAuth
    return this.http.get<LoginResponse>(`${this.apiUrl}/github`).pipe(
      tap(response => {
        if (response.success && response.token) {
          this.setAuthData(response.token, response.user, true);
        }
      }),
      catchError(error => {
        this.clearAuthData();
        return throwError(() => error);
      })
    );
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return this.isAuthenticated.value;
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.currentUser.value;
  }

  // Get user role
  getUserRole(): string {
    return this.currentUser.value?.role || 'user';
  }

  // Logout
  logout(): void {
    this.clearAuthData();
    this.router.navigate(['/login']);
  }

  // Private methods
  private setAuthData(token: string, user: User, rememberMe: boolean): void {
    const storage = rememberMe ? localStorage : sessionStorage;
    
    storage.setItem('auth_token', token);
    storage.setItem('user_data', JSON.stringify(user));
    
    this.isAuthenticated.next(true);
    this.currentUser.next(user);
  }

  private checkExistingAuth(): void {
    const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data') || sessionStorage.getItem('user_data');

    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        this.isAuthenticated.next(true);
        this.currentUser.next(user);
      } catch (error) {
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
  }

  // Get auth token (for HTTP requests)
  getToken(): string | null {
    return localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
  }
}