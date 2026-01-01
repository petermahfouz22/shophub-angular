import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { getFullName } from '../interfaces/user';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  activeSection = 'personal';
  private authService = inject(AuthService);
  user = this.authService.getCurrentUser();

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      firstName: [this.user?.first_name || '', Validators.required],
      lastName: [this.user?.last_name || '', Validators.required],
      email: [this.user?.email || '', [Validators.required, Validators.email]],
      phone: [
        this.user?.phone || '',
        [
          Validators.required,
          Validators.minLength(6),
        ],
      ],
      gender: [this.user?.gender || '', [Validators.required]],
      address: [
        this.user?.address || '',
        [Validators.required, Validators.minLength(5)],
      ],
      birthDay: [this.user?.birthday || '', [Validators.required]],
    });
    console.log(this.user, this.authService.isLoggedIn());
  }

  ngOnInit(): void {
    // Refresh user data from API on init
    if (this.authService.isLoggedIn()) {
      this.authService.getProfile().subscribe({
        next: (response) => {
          if (response.success && response.data) {
            this.user = response.data;
            this.profileForm.patchValue({
              firstName: response.data.first_name,
              lastName: response.data.last_name,
              email: response.data.email,
              phone: response.data.phone || '',
              gender: response.data.gender || '',
              address: response.data.address || '',
              birthDay: response.data.birthday || '',
            });
          }
        },
        error: (err) => {
          console.error('Error fetching profile:', err);
        }
      });
    }
  }

  get fullName(): string {
    return this.user ? getFullName(this.user) : 'User';
  }

  getNavItemClass(item: any): string {
    const baseClasses = 'p-3 rounded-lg cursor-pointer transition-colors';
    const isActive = this.activeSection === item.id;
    return isActive
      ? `${baseClasses} bg-blue-500 bg-opacity-20`
      : `${baseClasses} hover:bg-blue-500 hover:bg-opacity-10`;
  }

  changeAvatar(): void {
    // Implement avatar change logic
    console.log('Change avatar clicked');
  }

  onSubmit(): void {
    console.log('Submitting profile update');
    if (this.profileForm.valid) {
      const formData = {
        first_name: this.profileForm.value.firstName,
        last_name: this.profileForm.value.lastName,
        email: this.profileForm.value.email,
        phone: this.profileForm.value.phone,
        gender: this.profileForm.value.gender,
        birthday: this.profileForm.value.birthDay,
        address: this.profileForm.value.address,
      };
      console.log('Form data:', formData);
      
      this.authService.updateProfile(formData).subscribe({
        next: (res) => {
          alert('✅ Profile updated successfully!');
          console.log('Updated user:', res.data);
          this.user = res.data;
        },
        error: (err) => {
          console.error('Profile update error:', err);
          alert('❌ Failed to update profile.');
        },
      });
    }
  }
}
