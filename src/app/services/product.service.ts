import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, Product, ProductFormData } from '../interfaces/product';
import { Url } from '../urls.environment';
import { catchError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = Url.apiUrl;
  private adminUrl = Url.productsUrl;
  constructor(private http: HttpClient) {}

  // ==============================
  // 🟢 Public (User) Endpoints
  // ==============================

  /** يحصل على كل المنتجات المتاحة للمستخدم */
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  /** يحصل على تفاصيل منتج واحد */
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  // /** يحصل على كل التصنيفات */
  // getCategories(): Observable<Category[]> {
  //   return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  // }

  // ==============================
  // 🔵 Admin Endpoints
  // ==============================

  /** يحصل على كل المنتجات (بما في ذلك inactive أو المحذوفة مثلاً) */
  adminGetProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.adminUrl);
  }
  adminGetProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.adminUrl}/${id}`);
  }

  /** إنشاء منتج جديد */
  adminCreateProduct(
    product: Product
  ): Observable<{ message: string; product: Product }> {
    return this.http.post<{ message: string; product: Product }>(
      `${this.adminUrl}/create`,
      product
    );
  }

  adminUpdateProduct(
    id: number,
    product: Product
  ): Observable<{ message: string; product: Product }> {
    return this.http
      .put<{ message: string; product: Product }>(
        `${this.adminUrl}/edit/${id}`,
        product
      )
      .pipe(
        catchError((error) => {
          console.log('🔴 Full error response:', error);
          console.log('🔴 Validation errors:', error.error.errors);
          console.log('🔴 Error message:', error.error.message);
          throw error;
        })
      );
  }

  /** حذف منتج */
  adminDeleteProduct(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${this.adminUrl}/${id}`
    );
  }

  /** تحديث حالة منتج (active / inactive) */
  adminToggleProductStatus(
    id: number
  ): Observable<{ message: string; product: Product }> {
    return this.http.patch<{ message: string; product: Product }>(
      `${this.adminUrl}/${id}/status`,
      {}
    );
  }

  /** جلب بيانات الفورم (categories, brands, etc...) */
  adminGetFormData(): Observable<ProductFormData> {
    return this.http.get<ProductFormData>(
      `${this.adminUrl}/form/data`
    );
  }

  // // في product.service.ts
  // getProductsByCategory(
  //   categoryId: number,
  //   page: number = 1,
  //   perPage: number = 4
  // ): Observable<ProductResponse> {
  //   let params = new HttpParams()
  //     .set('page', page.toString())
  //     .set('per_page', perPage.toString())
  //     .set('category_id', categoryId.toString());

  //   return this.http.get<ProductResponse>(this.apiUrl, { params });
  // }
}
