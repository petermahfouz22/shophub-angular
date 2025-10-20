import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  activeSection = 'personal';
  private authService = inject(AuthService);
  user = this.authService.getCurrentUser();

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      firstName: [this.user?.name.split(' ')[0], Validators.required],
      lastName: [this.user?.name.split(' ')[1], Validators.required],
      email: [this.user?.email, [Validators.required, Validators.email]],
      phone: [
        this.user?.phone,
        [
          Validators.required,
          Validators.minLength(6),
          // Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
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

  ngOnInit(): void {}

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
  console.log('hello');
  if (this.profileForm.valid) {
    const formData = {
      name: `${this.profileForm.value.firstName} ${this.profileForm.value.lastName}`,
      email: this.profileForm.value.email,
      phone: this.profileForm.value.phone,
      gender: this.profileForm.value.gender,
      birthDay: this.profileForm.value.birthDay,
      address: this.profileForm.value.address,
    };
    console.log(formData);
    this.authService.updateProfile(formData).subscribe({
      next: (res) => {
        alert('✅ Profile updated successfully!');
        console.log('Updated user:', res.user);
      },
      error: (err) => {
        console.error('Profile update error:', err);
        alert('❌ Failed to update profile.');
      },
    });
  }
}

}
