import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Url, AdminUrl } from '../urls.environment';
import {
  CategoriesResponse,
  CategoryResponse,
  Category,
} from '../interfaces/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private publicUrl = Url.categoriesUrl;
  private adminUrl = AdminUrl.categoriesUrl;

  constructor(private http: HttpClient) {}

  // ==============================
  // 🟢 Public Endpoints
  // ==============================

  /** Get all active categories (public) */
  getCategories(
    page: number = 1,
    perPage: number = 15,
    search: string = ''
  ): Observable<CategoriesResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<CategoriesResponse>(this.publicUrl, { params });
  }

  /** Get single category by ID (public) */
  getCategory(id: number): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(`${this.publicUrl}/${id}`);
  }

  /** Get parent categories for dropdowns (public) */
  getParentCategories(): Observable<{ success: boolean; data: Category[] }> {
    return this.http.get<{ success: boolean; data: Category[] }>(
      `${this.publicUrl}/parent-categories`
    );
  }

  // ==============================
  // 🔵 Admin Endpoints
  // ==============================

  /** Get all categories for admin (including inactive) */
  adminGetCategories(
    page: number = 1,
    perPage: number = 15,
    search: string = '',
    status: string = ''
  ): Observable<CategoriesResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());

    if (search) {
      params = params.set('search', search);
    }

    if (status) {
      params = params.set('status', status);
    }

    return this.http.get<CategoriesResponse>(this.adminUrl, { params });
  }

  /** Get single category by ID for admin */
  adminGetCategory(id: number): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(`${this.adminUrl}/${id}`);
  }

  /** Get parent categories for admin */
  adminGetParentCategories(): Observable<{ success: boolean; data: Category[] }> {
    return this.http.get<{ success: boolean; data: Category[] }>(
      `${this.adminUrl}/parent-categories`
    );
  }

  /** Create new category */
  createCategory(categoryData: FormData): Observable<CategoryResponse> {
    return this.http.post<CategoryResponse>(this.adminUrl, categoryData);
  }

  /** Update category */
  updateCategory(
    id: number,
    categoryData: FormData
  ): Observable<CategoryResponse> {
    return this.http.post<CategoryResponse>(
      `${this.adminUrl}/edit/${id}`,
      categoryData
    );
  }

  /** Delete category */
  deleteCategory(id: number): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(`${this.adminUrl}/${id}`);
  }

  /** Update category status */
  updateCategoryStatus(
    id: number,
    status: string
  ): Observable<CategoryResponse> {
    return this.http.patch<CategoryResponse>(`${this.adminUrl}/${id}/status`, {
      status,
    });
  }
}
