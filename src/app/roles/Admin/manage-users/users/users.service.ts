import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
import { Url } from './urls.environment';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersList = signal<User[]>([]);
  users = this.usersList.asReadonly();

  constructor(private http: HttpClient) {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      try {
        this.usersList.set(JSON.parse(savedUsers));
      } catch (error) {
        console.error('Error parsing users from localStorage:', error);
        this.usersList.set([]);
      }
    }
  }

  getUsers(): Observable<any> {
    return this.http.get(`${Url.apiUrl}users`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${Url.apiUrl}users/${id}`);
  }

  removeUser(id: number): Observable<any> {
    return this.http.delete(`${Url.apiUrl}users/${id}`);
  }

  // private saveUsers() {
  //   localStorage.setItem('users', JSON.stringify(this.users()));
  // }
}
