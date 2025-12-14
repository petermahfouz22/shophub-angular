// src/app/admin/components/new-brand/new-brand.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrandService } from '../../../../services/brand.service';
import { BrandResponse } from '../../../../interfaces/brand';
@Component({
  selector: 'app-new-brand',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './new-brand.component.html'
})
export class NewBrandComponent implements OnInit {
  brandForm: FormGroup;
  loading = false;
  logoPreview: string | ArrayBuffer | null = null;
  logoFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private brandService: BrandService,
    private router: Router
  ) {
    this.brandForm = this.createForm();
  }

  ngOnInit(): void {}

  createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      description: [''],
      website: ['', [Validators.pattern('https?://.+')]],
      status: ['active', Validators.required],
      logo: [null]
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml'];
      if (!validTypes.includes(file.type)) {
        alert('Please select a valid image file (JPEG, PNG, JPG, GIF, SVG)');
        return;
      }

      // Validate file size (2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('File size must be less than 2MB');
        return;
      }

      this.logoFile = file;
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        this.logoPreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeLogo(): void {
    this.logoFile = null;
    this.logoPreview = null;
    this.brandForm.patchValue({ logo: null });
  }

  onSubmit(): void {
    if (this.brandForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.loading = true;
    const formData = new FormData();

    // Append form data
    Object.keys(this.brandForm.controls).forEach(key => {
      if (key !== 'logo') {
        const value = this.brandForm.get(key)?.value;
        if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      }
    });

    // Append logo file if selected
    if (this.logoFile) {
      formData.append('logo', this.logoFile);
    }

    this.brandService.createBrand(formData).subscribe({
      next: (response: BrandResponse) => {
        this.loading = false;
        if (response.success) {
          alert('Brand created successfully!');
          this.router.navigate(['/admin/brands']);
        } else {
          alert(response.message || 'Failed to create brand');
        }
      },
      error: (error) => {
        this.loading = false;
        console.error('Error creating brand:', error);
        
        if (error.error?.errors) {
          const errors = error.error.errors;
          Object.keys(errors).forEach(key => {
            alert(`${key}: ${errors[key].join(', ')}`);
          });
        } else if (error.error?.message) {
          alert(error.error.message);
        } else {
          alert('Error creating brand. Please try again.');
        }
      }
    });
  }

  private markFormGroupTouched(): void {
    Object.keys(this.brandForm.controls).forEach(key => {
      this.brandForm.get(key)?.markAsTouched();
    });
  }

  // Getters for form controls
  get name() { return this.brandForm.get('name'); }
  get website() { return this.brandForm.get('website'); }
}