import { Injectable, signal } from '@angular/core';
import { User } from './user';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersList = signal<User[]>([]);
  users = this.usersList.asReadonly();

  constructor() {
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

  addUser(userData: User) {
    this.usersList.update((users) => [...users, userData]);
    console.log('from usersSERVICE'+ this.usersList);
    this.saveUsers();
  }

  private saveUsers() {
    localStorage.setItem('users', JSON.stringify(this.users()));
  }

}
