import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  
  // Get token from storage
  const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
  
  console.log('Interceptor: Processing request', req.url, 'Token exists:', !!token);
  
  let clonedReq = req;
  
  // If token exists, add it to the header
  if (token) {
    clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Interceptor: Added Authorization header');
  }
  
  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Unauthorized - clear auth data and redirect to login
        console.log('Interceptor: 401 Unauthorized - redirecting to login');
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        sessionStorage.removeItem('auth_token');
        sessionStorage.removeItem('user_data');
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};