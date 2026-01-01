// src/app/services/brand.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Url, AdminUrl } from '../urls.environment';
import { BrandResponse, BrandsResponse, Brand } from '../interfaces/brand';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private publicUrl = Url.brandsUrl;
  private adminUrl = AdminUrl.brandsUrl;

  constructor(private http: HttpClient) {}

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

  // ==============================
  // 🟢 Public Endpoints
  // ==============================

  /** Get all active brands (public) */
  getBrands(params?: {
    page?: number;
    per_page?: number;
    search?: string;
  }): Observable<BrandsResponse> {
    let httpParams = new HttpParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          httpParams = httpParams.set(key, value.toString());
        }
      });
    }

    return this.http.get<BrandsResponse>(this.publicUrl, { params: httpParams })
      .pipe(catchError(this.handleError));
  }

  /** Get single brand by ID (public) */
  getBrand(id: number): Observable<BrandResponse> {
    return this.http.get<BrandResponse>(`${this.publicUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // ==============================
  // 🔵 Admin Endpoints
  // ==============================

  /** Get all brands for admin (including inactive) */
  adminGetBrands(params?: {
    page?: number;
    per_page?: number;
    search?: string;
    status?: string;
  }): Observable<BrandsResponse> {
    let httpParams = new HttpParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          httpParams = httpParams.set(key, value.toString());
        }
      });
    }

    return this.http.get<BrandsResponse>(this.adminUrl, { params: httpParams })
      .pipe(catchError(this.handleError));
  }

  /** Get single brand by ID for admin */
  adminGetBrand(id: number): Observable<BrandResponse> {
    return this.http.get<BrandResponse>(`${this.adminUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  /** Create new brand */
  createBrand(brandData: FormData): Observable<BrandResponse> {
    console.log('Creating brand with data:', brandData);
    return this.http.post<BrandResponse>(this.adminUrl, brandData)
      .pipe(catchError(this.handleError));
  }

  /** Update brand */
  updateBrand(id: number, brandData: FormData): Observable<BrandResponse> {
    console.log(`Updating brand ${id} with data:`, brandData);

    // Log FormData contents for debugging
    for (const pair of (brandData as any).entries()) {
      console.log(`FormData - ${pair[0]}:`, pair[1]);
    }

    return this.http.put<BrandResponse>(`${this.adminUrl}/${id}`, brandData)
      .pipe(catchError(this.handleError));
  }

  /** Delete brand */
  deleteBrand(id: number): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(`${this.adminUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  /** Update brand status */
  updateBrandStatus(id: number, status?: string): Observable<BrandResponse> {
    return this.http.patch<BrandResponse>(`${this.adminUrl}/${id}/status`, status ? { status } : {})
      .pipe(catchError(this.handleError));
  }
}
