// src/app/admin/categories/category-form/category-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoryService} from '../../../../services/category.service';
import { Category } from '../../../../interfaces/category';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-category',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './new-category.component.html',
})
export class NewCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  parentCategories: Category[] = [];
  imagePreview: string | null = null;
  selectedFile: File | null = null;
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.categoryForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadParentCategories();
    this.checkParentFromQueryParams();
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255)
      ]],
      description: ['', [
        Validators.maxLength(500)
      ]],
      parent_id: [null],
      status: ['active', [Validators.required]],
      image: [null, [Validators.required]]
    });
  }

  loadParentCategories(): void {
    this.categoryService.getParentCategories().subscribe({
      next: (response) => {
        this.parentCategories = response.data;
      },
      error: (error) => {
        console.error('Error loading parent categories:', error);
        this.errorMessage = 'Failed to load parent categories';
      }
    });
  }

  checkParentFromQueryParams(): void {
    this.route.queryParams.subscribe(params => {
      const parentId = params['parent_id'];
      if (parentId) {
        this.categoryForm.patchValue({
          parent_id: parseInt(parentId)
        });
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.validateAndSetImage(file);
    }
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.validateAndSetImage(files[0]);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  validateAndSetImage(file: File): void {
    // Check file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      this.errorMessage = 'Please select a valid image file (JPEG, PNG, GIF)';
      return;
    }

    // Check file size (2MB)
    if (file.size > 2 * 1024 * 1024) {
      this.errorMessage = 'Image size should be less than 2MB';
      return;
    }

    this.selectedFile = file;
    this.categoryForm.patchValue({ image: file });

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);

    this.errorMessage = '';
  }

  removeImage(): void {
    this.imagePreview = null;
    this.selectedFile = null;
    this.categoryForm.patchValue({ image: null });
    this.errorMessage = '';
  }

  generateSlug(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      this.isSubmitting = true;
      this.errorMessage = '';

      const formData = new FormData();
      formData.append('name', this.categoryForm.get('name')?.value);
      formData.append('description', this.categoryForm.get('description')?.value || '');
      formData.append('status', this.categoryForm.get('status')?.value);
      
      if (this.categoryForm.get('parent_id')?.value) {
        formData.append('parent_id', this.categoryForm.get('parent_id')?.value);
      }

      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      this.categoryService.createCategory(formData).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.successMessage = 'Category created successfully!';
          
          setTimeout(() => {
            this.router.navigate(['/admin/categories']);
          }, 1500);
        },
        error: (error) => {
          this.isSubmitting = false;
          this.errorMessage = error.error?.message || 'Failed to create category';
          console.error('Error creating category:', error);
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.categoryForm.controls).forEach(key => {
        const control = this.categoryForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/admin/categories']);
  }
}