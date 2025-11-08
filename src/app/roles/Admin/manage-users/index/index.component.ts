import { Component, OnInit } from '@angular/core';
import { User, UserFormData } from '../../../../interfaces/user';
import { UserService } from '../../../../services/user.service';
import { finalize } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  imports: [FormsModule, DatePipe, CommonModule],
  templateUrl: './index.component.html',
})
export class IndexComponent implements OnInit {
  users: User[] = [];
  loading = false;

  // Only delete modal remains
  showDeleteModal = false;
  selectedUser: User | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // Index - Load all users
  loadUsers(): void {
    this.loading = true;
    this.userService
      .getUsers()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (response) => {
          this.users = response.data;
        },
        error: (error) => {
          console.error('Error loading users:', error);
        },
      });
  }

  // Navigate to edit page
  editUser(user: User): void {
    this.router.navigate(['admin/users/edit', user.id]);
  }

  // Navigate to view page
  viewUser(user: User): void {
    this.router.navigate(['admin/users', user.id]);
  }

  // Delete - Confirm deletion
  openDeleteModal(user: User): void {
    this.selectedUser = user;
    this.showDeleteModal = true;
  }

  // Delete - Delete user
  deleteUser(): void {
    if (!this.selectedUser) return;

    this.loading = true;
    this.userService
      .deleteUser(this.selectedUser.id)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.showDeleteModal = false;
        })
      )
      .subscribe({
        next: (response) => {
          console.log('User deleted:', response.message);
          this.users = this.users.filter((u) => u.id !== this.selectedUser?.id);
        },
        error: (error) => {
          console.error('Error deleting user:', error);
        },
      });
  }

  closeModals(): void {
    this.showDeleteModal = false;
    this.selectedUser = null;
  }
}