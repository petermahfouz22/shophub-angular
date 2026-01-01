import { Component, OnInit } from '@angular/core';
import { User, UpdateUserData } from '../../../../interfaces/user';
import { UserService } from '../../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit',
  imports: [FormsModule, CommonModule],
  templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit {
  user: User | null = null;
  loading = false;
  submitting = false;

  userForm: UpdateUserData = {
    first_name: '',
    last_name: '',
    email: '',
    gender: 'male',
    phone: '',
    birthday: '',
    address: '',
    role: 'customer',
    is_active: true,
  };

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUser();
  }

  // Load user data for editing
  loadUser(): void {
    const userId = this.route.snapshot.paramMap.get('id');

    if (!userId) {
      alert('User ID not found');
      this.router.navigate(['admin/users']);
      return;
    }

    this.loading = true;
    this.userService
      .getUser(+userId)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (response) => {
          console.log(response);
          if (response.success) {
            this.user = response.data;
            this.populateForm(response.data);
          }
        },
        error: (error) => {
          console.error('Error loading user:', error);
          alert('Error loading user data');
          this.router.navigate(['admin/users']);
        },
      });
  }

  // Populate form with user data
  populateForm(user: User): void {
    this.userForm = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      gender: user.gender || 'male',
      phone: user.phone || '',
      birthday: user.birthday ? user.birthday.split('T')[0] : '', // Format date for input
      address: user.address || '',
      role: user.role,
      is_active: user.is_active,
    };
  }

  // Get full name for display
  get fullName(): string {
    return `${this.userForm.first_name} ${this.userForm.last_name}`.trim();
  }

  // Update user
  updateUser(): void {
    if (!this.user) return;

    this.submitting = true;
    this.userService
      .updateUser(this.user.id, this.userForm)
      .pipe(finalize(() => (this.submitting = false)))
      .subscribe({
        next: (response) => {
          if (response.success) {
            alert('User updated successfully');
            this.router.navigate(['admin/users']);
          }
        },
        error: (error) => {
          console.error('Error updating user:', error);
          alert(error.error?.message || 'Error updating user');
        },
      });
  }

  // Cancel and go back
  cancel(): void {
    this.router.navigate(['admin/users']);
  }
}
