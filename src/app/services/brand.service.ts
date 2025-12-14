// src/app/services/brand.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Url } from '../urls.environment';
import { BrandResponse } from '../interfaces/brand';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private apiUrl = `${Url.apiUrl}/admin/brands`;

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    
    if (error.status === 0) {
      // Network error
      return throwError(() => new Error('Network error: Please check your connection'));
    } else if (error.status === 422) {
      // Validation error
      return throwError(() => error);
    } else if (error.status === 500) {
      // Server error
      return throwError(() => new Error('Server error: Please try again later'));
    } else {
      // Other errors
      return throwError(() => new Error(error.error?.message || 'An unexpected error occurred'));
    }
  }

  getBrands(params?: any): Observable<BrandResponse> {
    let httpParams = new HttpParams();
    
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }

    return this.http.get<BrandResponse>(this.apiUrl, { params: httpParams })
      .pipe(catchError(this.handleError));
  }

  getBrand(id: number): Observable<BrandResponse> {
    return this.http.get<BrandResponse>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  createBrand(brandData: FormData): Observable<BrandResponse> {
    console.log('Creating brand with data:', brandData);
    return this.http.post<BrandResponse>(this.apiUrl, brandData)
      .pipe(catchError(this.handleError));
  }

  updateBrand(id: number, brandData: FormData): Observable<BrandResponse> {
    console.log(`Updating brand ${id} with data:`, brandData);
    
    // Log FormData contents for debugging
    for (let pair of (brandData as any).entries()) {
      console.log(`FormData - ${pair[0]}:`, pair[1]);
    }

    return this.http.put<BrandResponse>(`${this.apiUrl}/${id}`, brandData)
      .pipe(catchError(this.handleError));
  }

  deleteBrand(id: number): Observable<BrandResponse> {
    return this.http.delete<BrandResponse>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  updateBrandStatus(id: number, status: string): Observable<BrandResponse> {
    return this.http.patch<BrandResponse>(`${this.apiUrl}/${id}/status`, { status })
      .pipe(catchError(this.handleError));
  }

  getActiveBrands(): Observable<BrandResponse> {
    return this.http.get<BrandResponse>(`${Url.apiUrl}/active-brands`)
      .pipe(catchError(this.handleError));
  }
}