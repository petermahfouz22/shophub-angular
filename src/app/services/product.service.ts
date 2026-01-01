import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ProductFormData } from '../interfaces/product';
import { Url, AdminUrl } from '../urls.environment';
import { catchError } from 'rxjs';

export interface ProductsResponse {
  success?: boolean;
  data?: Product[];
  message?: string;
}

export interface ProductResponse {
  success: boolean;
  data: Product;
  message?: string;
}

export interface PaginatedProductsResponse {
  success: boolean;
  data: {
    data: Product[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private publicUrl = Url.productsUrl;
  private adminUrl = AdminUrl.productsUrl;

  constructor(private http: HttpClient) {}

  // ==============================
  // 🟢 Public (User) Endpoints
  // ==============================

  /** Get all active products for public view */
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.publicUrl);
  }

  /** Get paginated products with optional filters */
  getProducts(params?: {
    page?: number;
    per_page?: number;
    category_id?: number;
    brand_id?: number;
    search?: string;
    min_price?: number;
    max_price?: number;
    sort_by?: string;
    sort_order?: 'asc' | 'desc';
  }): Observable<PaginatedProductsResponse> {
    let httpParams = new HttpParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          httpParams = httpParams.set(key, value.toString());
        }
      });
    }

    return this.http.get<PaginatedProductsResponse>(this.publicUrl, { params: httpParams });
  }

  /** Get product details by ID */
  getProductById(id: number): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.publicUrl}/${id}`);
  }

  /** Get form data (categories and brands) for product forms */
  getFormData(): Observable<{ success: boolean; data: ProductFormData }> {
    return this.http.get<{ success: boolean; data: ProductFormData }>(`${this.publicUrl}/form/data`);
  }

  // ==============================
  // 🔵 Admin Endpoints
  // ==============================

  /** Get all products for admin (including inactive) */
  adminGetProducts(params?: {
    page?: number;
    per_page?: number;
    search?: string;
    status?: string;
    category_id?: number;
    brand_id?: number;
  }): Observable<PaginatedProductsResponse> {
    let httpParams = new HttpParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          httpParams = httpParams.set(key, value.toString());
        }
      });
    }

    return this.http.get<PaginatedProductsResponse>(this.adminUrl, { params: httpParams });
  }

  /** Get product by ID for admin */
  adminGetProductById(id: number): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.adminUrl}/${id}`);
  }

  /** Create new product (multipart/form-data for image upload) */
  adminCreateProduct(productData: FormData): Observable<{ success: boolean; message: string; data: Product }> {
    return this.http.post<{ success: boolean; message: string; data: Product }>(
      this.adminUrl,
      productData
    );
  }

  /** Update product */
  adminUpdateProduct(
    id: number,
    productData: any
  ): Observable<{ success: boolean; message: string; data: Product }> {
    return this.http
      .put<{ success: boolean; message: string; data: Product }>(
        `${this.adminUrl}/${id}`,
        productData
      )
      .pipe(
        catchError((error) => {
          console.log('🔴 Full error response:', error);
          console.log('🔴 Validation errors:', error.error?.errors);
          console.log('🔴 Error message:', error.error?.message);
          throw error;
        })
      );
  }

  /** Delete product */
  adminDeleteProduct(id: number): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(
      `${this.adminUrl}/${id}`
    );
  }

  /** Toggle product status (active/inactive) */
  adminToggleProductStatus(
    id: number
  ): Observable<{ success: boolean; message: string; data: Product }> {
    return this.http.patch<{ success: boolean; message: string; data: Product }>(
      `${this.adminUrl}/${id}/status`,
      {}
    );
  }

  /** Get form data for admin product forms */
  adminGetFormData(): Observable<{ success: boolean; data: ProductFormData }> {
    return this.http.get<{ success: boolean; data: ProductFormData }>(
      `${this.adminUrl}/form/data`
    );
  }
}
