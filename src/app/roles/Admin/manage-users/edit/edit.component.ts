import { Component, OnInit } from '@angular/core';
import { User, UserFormData } from '../../../../interfaces/user';
import { UserService } from '../../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit',
  imports: [FormsModule, CommonModule],
  templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit {
  user: User | null = null;
  loading = false;
  submitting = false;
  
  userForm: UserFormData = {
    name: '',
    email: '',
    gender: 'male',
    phone: '',
    birthday: '',
    address: '',
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
    this.userService.getUser(+userId)
      .pipe(finalize(() => this.loading = false))
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
        }
      });
  }

  // Populate form with user data
  populateForm(user: User): void {
    this.userForm = {
      name: user.name,
      email: user.email,
      gender: user.gender,
      phone: user.phone,
      birthday: user.birthday.split('T')[0], // Format date for input
      address: user.address,
    };
  }

  // Update user
  updateUser(): void {
    if (!this.user) return;

    this.submitting = true;
    this.userService.updateUser(this.user.id, this.userForm)
      .pipe(finalize(() => this.submitting = false))
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
        }
      });
  }

  // Cancel and go back
  cancel(): void {
    this.router.navigate(['admin/users']);
  }
}