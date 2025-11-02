import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, Product,ProductFormData} from '../interfaces/product';
import { Url } from '../urls.environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = Url.apiUrl;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/products`);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }
  getCategories():Observable<Category>{
    return this.http.get<Category>(`${this.apiUrl}/categories`)

  }

  createProduct(product: Product): Observable<{ message: string; product: Product }> {
    return this.http.post<{ message: string; product: Product }>(`${this.apiUrl}/products/new-product`, product);
  }

  updateProduct(id: number, product: Product): Observable<{ message: string; product: Product }> {
    return this.http.put<{ message: string; product: Product }>(`${this.apiUrl}/products/${id}`, product);
  }

  deleteProduct(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/products/${id}`);
  }

  getFormData(): Observable<ProductFormData> {
    return this.http.get<ProductFormData>(`${this.apiUrl}/products/form/data`);
  }
}
