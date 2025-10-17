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
  // user = {
  //   name: 'John Doe',
  //   title: 'Software Developer',
  //   avatar: '',
  //   stats: {
  //     posts: 24,
  //     followers: 1284,
  //     following: 362
  //   }
  // };

  navItems = [
    {
      id: 'personal',
      label: 'Personal Info',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    },
    {
      id: 'security',
      label: 'Security',
      icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
    },
    {
      id: 'preferences',
      label: 'Preferences',
      icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
    },
  ];

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      firstName: [this.user?.name.split(' ')[0], Validators.required],
      lastName: [this.user?.name.split(' ')[1], Validators.required],
      email: [this.user?.email, [Validators.required, Validators.email]],
      phone: ['+1 (555) 123-4567'],
      bio: ['Passionate software developer with 5+ years of experience...'],
    });
    console.log(this.user,this.authService.isLoggedIn());
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
    if (this.profileForm.valid) {
      console.log('Form submitted:', this.profileForm.value);
      // Add your save logic here
    }
  }
}
