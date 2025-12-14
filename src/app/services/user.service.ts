import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  User,
  UserFormData,
  UsersResponse,
  UserResponse,
} from '../interfaces/user';
import { Url, baseAdminUrl} from '../urls.environment';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = baseAdminUrl;

  constructor(private http: HttpClient) {}

  /**
   * INDEX - Get all users
   * Calls: GET /api/admin/users
   * Controller: UserController@index
   */
  getUsers(): Observable<UsersResponse> {
    return this.http.get<UsersResponse>(`${this.baseUrl}/users`);
  }

  /**
   * SHOW - Get single user
   * Calls: GET /api/admin/users/{id}
   * Controller: UserController@show
   */
  getUser(id: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.baseUrl}/users/${id}`);
  }

  /**
   * UPDATE - Update user
   * Calls: PUT /api/admin/users/{id}
   * Controller: UserController@update
   */
  updateUser(id: number, userData: UserFormData): Observable<UserResponse> {
    console.log('Updating user with ID:', id);
    console.log('Data:', userData);
    return this.http.put<UserResponse>(`${this.baseUrl}/users/${id}`, userData);
  }

  /**
   * DELETE - Delete user
   * Calls: DELETE /api/admin/users/{id}
   * Controller: UserController@destroy
   */
  deleteUser(id: number): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(
      `${this.baseUrl}/users/${id}`
    );
  }
}
