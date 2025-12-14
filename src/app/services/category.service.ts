import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Url } from '../urls.environment';
import {
  CategoriesResponse,
  CategoryResponse,
  Category,
} from '../interfaces/category';
// import {CategoriesResponse}from '../interfaces/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = Url.categoriesUrl;

  constructor(private http: HttpClient) {}

  getCategories(
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

    return this.http.get<CategoriesResponse>(this.apiUrl, { params });
  }

  getCategory(id: number): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(`${this.apiUrl}/${id}`);
  }

  createCategory(categoryData: FormData): Observable<CategoryResponse> {
    return this.http.post<CategoryResponse>(this.apiUrl, categoryData);
  }

  updateCategory(
    id: number,
    categoryData: FormData
  ): Observable<CategoryResponse> {
    return this.http.post<CategoryResponse>(
      `${this.apiUrl}/edit/${id}`,
      categoryData
    );
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateCategoryStatus(
    id: number,
    status: string
  ): Observable<CategoryResponse> {
    return this.http.patch<CategoryResponse>(`${this.apiUrl}/${id}/status`, {
      status,
    });
  }

  getParentCategories(): Observable<{ success: boolean; data: Category[] }> {
    return this.http.get<{ success: boolean; data: Category[] }>(
      `${this.apiUrl}/parent-categories`
    );
  }
}
