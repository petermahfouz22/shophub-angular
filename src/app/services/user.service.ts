import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  User,
  UserFormData,
  CreateUserData,
  UpdateUserData,
  UsersResponse,
  UserResponse,
} from '../interfaces/user';
import { AdminUrl } from '../urls.environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private adminUrl = AdminUrl.usersUrl;

  constructor(private http: HttpClient) {}

  /**
   * INDEX - Get all users
   * Calls: GET /v1/admin/users
   */
  getUsers(params?: {
    page?: number;
    per_page?: number;
    search?: string;
    role?: string;
    is_active?: boolean;
  }): Observable<UsersResponse> {
    let httpParams = new HttpParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          httpParams = httpParams.set(key, value.toString());
        }
      });
    }

    return this.http.get<UsersResponse>(this.adminUrl, { params: httpParams });
  }

  /**
   * SHOW - Get single user
   * Calls: GET /v1/admin/users/{id}
   */
  getUser(id: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.adminUrl}/${id}`);
  }

  /**
   * STORE - Create new user (Admin only)
   * Calls: POST /v1/admin/users
   */
  createUser(userData: CreateUserData): Observable<UserResponse> {
    console.log('Creating user with data:', userData);
    return this.http.post<UserResponse>(this.adminUrl, userData);
  }

  /**
   * UPDATE - Update user
   * Calls: PUT /v1/admin/users/{id}
   */
  updateUser(id: number, userData: UpdateUserData): Observable<UserResponse> {
    console.log('Updating user with ID:', id);
    console.log('Data:', userData);
    return this.http.put<UserResponse>(`${this.adminUrl}/${id}`, userData);
  }

  /**
   * DELETE - Delete user
   * Calls: DELETE /v1/admin/users/{id}
   */
  deleteUser(id: number): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(
      `${this.adminUrl}/${id}`
    );
  }
}
