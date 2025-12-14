// src/app/admin/components/edit-brand/edit-brand.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrandService } from '../../../../services/brand.service';
import { BrandResponse}from'../../../../interfaces/brand';
@Component({
  selector: 'app-edit-brand',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-brand.component.html'
})
export class EditBrandComponent implements OnInit {
  brandForm: FormGroup;
  loading = false;
  brandId!: number;
  logoPreview: string | ArrayBuffer | null = null;
  logoFile: File | null = null;
  initialData: any = null;

  constructor(
    private fb: FormBuilder,
    private brandService: BrandService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.brandForm = this.createForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.brandId = +params['id'];
      this.loadBrand();
    });
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      description: [''],
      website: ['', [Validators.pattern('https?://.+')]],
      status: ['active', Validators.required],
      logo: [null]
    });
  }

  loadBrand(): void {
    this.loading = true;
    this.brandService.getBrand(this.brandId).subscribe({
      next: (response: BrandResponse) => {
        this.loading = false;
        if (response.success) {
          this.initialData = response.data;
          this.brandForm.patchValue({
            name: response.data.name,
            description: response.data.description,
            website: response.data.website,
            status: response.data.status
          });
          
          if (response.data.logo_url) {
            this.logoPreview = response.data.logo_url;
          }
        } else {
          alert('Failed to load brand data');
          this.router.navigate(['/admin/brands']);
        }
      },
      error: (error) => {
        this.loading = false;
        console.error('Error loading brand:', error);
        alert('Error loading brand data');
        this.router.navigate(['/admin/brands']);
      }
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

    this.brandService.updateBrand(this.brandId, formData).subscribe({
      next: (response: BrandResponse) => {
        console.log(response)
        this.loading = false;
        if (response.success) {
          alert('Brand updated successfully!');
          this.router.navigate(['/admin/brands']);
        } else {
          alert(response.message || 'Failed to update brand');
        }
      },
      error: (error) => {
        this.loading = false;
        console.error('Error updating brand:', error);
        
        if (error.error?.errors) {
          const errors = error.error.errors;
          Object.keys(errors).forEach(key => {
            alert(`${key}: ${errors[key].join(', ')}`);
          });
        } else if (error.error?.message) {
          alert(error.error.message);
        } else {
          alert('Error updating brand. Please try again.');
        }
      }
    });
  }

  onDelete(): void {
    if (confirm('Are you sure you want to delete this brand? This action cannot be undone.')) {
      this.loading = true;
      this.brandService.deleteBrand(this.brandId).subscribe({
        next: (response: BrandResponse) => {
          this.loading = false;
          if (response.success) {
            alert('Brand deleted successfully!');
            this.router.navigate(['/admin/brands']);
          } else {
            alert(response.message || 'Failed to delete brand');
          }
        },
        error: (error) => {
          this.loading = false;
          console.error('Error deleting brand:', error);
          
          if (error.error?.message) {
            alert(error.error.message);
          } else {
            alert('Error deleting brand. Please try again.');
          }
        }
      });
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.brandForm.controls).forEach(key => {
      this.brandForm.get(key)?.markAsTouched();
    });
  }

  // Check if form has changes
  hasChanges(): boolean {
    if (!this.initialData) return false;
    
    return (
      this.brandForm.get('name')?.value !== this.initialData.name ||
      this.brandForm.get('description')?.value !== this.initialData.description ||
      this.brandForm.get('website')?.value !== this.initialData.website ||
      this.brandForm.get('status')?.value !== this.initialData.status ||
      this.logoFile !== null
    );
  }

  // Getters for form controls
  get name() { return this.brandForm.get('name'); }
  get website() { return this.brandForm.get('website'); }
}