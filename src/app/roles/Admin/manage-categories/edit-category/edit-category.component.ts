import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CategoryService } from '../../../../services/category.service';
import { Category } from '../../../../interfaces/category';
@Component({
  selector: 'app-edit-category',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './edit-category.component.html',
})
export class EditCategoryComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;

  categoryForm: FormGroup;
  category: Category | null = null;
  parentCategories: Category[] = [];
  imagePreview: string | null = null;
  selectedFile: File | null = null;
  isSubmitting = false;
  isLoading = false;
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
    this.loadCategory();
    this.loadParentCategories();
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(255),
        ],
      ],
      description: ['', [Validators.maxLength(500)]],
      parent_id: [null],
      status: ['active', [Validators.required]],
      image: [null],
    });
  }

  loadCategory(): void {
    this.isLoading = true;
    const categoryId = this.route.snapshot.paramMap.get('id');

    if (!categoryId) {
      this.errorMessage = 'Category ID is required';
      this.isLoading = false;
      return;
    }

    this.categoryService.getCategory(+categoryId).subscribe({
      next: (response) => {
        this.category = response.data;
        console.log(this.category);
        this.populateForm();
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load category';
        this.isLoading = false;
        console.error('Error loading category:', error);
      },
    });
  }

  loadParentCategories(): void {
    this.categoryService.getParentCategories().subscribe({
      next: (response) => {
        // استبعاد الفئة الحالية من قائمة الفئات الأصل
        this.parentCategories = response.data.filter(
          (cat) => cat.id !== this.category?.id
        );
      },
      error: (error) => {
        console.error('Error loading parent categories:', error);
        this.errorMessage = 'Failed to load parent categories';
      },
    });
  }

  populateForm(): void {
    if (!this.category) return;

    this.categoryForm.patchValue({
      name: this.category.name,
      description: this.category.description,
      parent_id: this.category.parent_id,
      status: this.category.status,
    });

    // تعيين معاينة الصورة الحالية
    if (this.category.image_url) {
      this.imagePreview = this.getImageUrl(this.category.image_url);
    }

    // إعادة تعيين حالة النموذج لنظيفة
    this.categoryForm.markAsPristine();
  }

  getImageUrl(imageUrl: string | null): string {
    if (!imageUrl) {
      return 'https://via.placeholder.com/400x400?text=No+Image';
    }

    if (imageUrl.startsWith('/storage/')) {
      return `http://localhost:8000${imageUrl}`;
    }

    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }

    return imageUrl;
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
    const target = event.currentTarget as HTMLElement;
    target.classList.add('border-blue-400', 'bg-blue-50');
  }

  onDragLeave(event: DragEvent): void {
    const target = event.currentTarget as HTMLElement;
    target.classList.remove('border-blue-400', 'bg-blue-50');
  }

  validateAndSetImage(file: File): void {
    const validTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
    ];
    if (!validTypes.includes(file.type)) {
      this.errorMessage =
        'Please select a valid image file (JPEG, PNG, GIF, WEBP)';
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      this.errorMessage = 'Image size should be less than 2MB';
      return;
    }

    this.selectedFile = file;
    this.categoryForm.patchValue({ image: file });
    this.categoryForm.get('image')?.updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.onerror = () => {
      this.errorMessage = 'Failed to read the image file';
    };
    reader.readAsDataURL(file);

    this.errorMessage = '';
    this.categoryForm.markAsDirty();
  }

  removeImage(): void {
    this.imagePreview = this.category?.image_url
      ? this.getImageUrl(this.category.image_url)
      : null;
    this.selectedFile = null;
    this.categoryForm.patchValue({ image: null });
    this.categoryForm.get('image')?.updateValueAndValidity();

    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }

    this.errorMessage = '';
    this.categoryForm.markAsDirty();
  }

  generateSlug(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  resetForm(): void {
    if (this.category) {
      this.populateForm();
      this.selectedFile = null;
      this.successMessage = 'Form reset to original values';
      setTimeout(() => (this.successMessage = ''), 3000);
    }
  }

  onSubmit(): void {
    if (this.categoryForm.valid && this.category) {
      this.isSubmitting = true;
      this.errorMessage = '';

      const formData = new FormData();
      formData.append('name', this.categoryForm.get('name')?.value);
      formData.append(
        'description',
        this.categoryForm.get('description')?.value || ''
      );
      formData.append('status', this.categoryForm.get('status')?.value);
      formData.append('_method', 'PUT'); // مهم لـ Laravel مع FormData

      if (this.categoryForm.get('parent_id')?.value) {
        formData.append('parent_id', this.categoryForm.get('parent_id')?.value);
      } else {
        formData.append('parent_id', '');
      }

      if (this.selectedFile) {
        formData.append('image', this.selectedFile, this.selectedFile.name);
      }

      this.categoryService
        .updateCategory(this.category.id, formData)
        .subscribe({
          next: (response) => {
            this.isSubmitting = false;
            this.successMessage = 'Category updated successfully!';
            this.categoryForm.markAsPristine();

            setTimeout(() => {
              this.router.navigate(['/admin/categories']);
            }, 1500);
          },
          error: (error) => {
            this.isSubmitting = false;
            this.errorMessage =
              error.error?.message || 'Failed to update category';
            console.error('Error updating category:', error);
          },
        });
    } else {
      Object.keys(this.categoryForm.controls).forEach((key) => {
        const control = this.categoryForm.get(key);
        control?.markAsTouched();
      });

      this.errorMessage = 'Please fill all required fields correctly';
    }
  }

  goBack(): void {
    if (this.categoryForm.dirty) {
      if (
        confirm('You have unsaved changes. Are you sure you want to leave?')
      ) {
        this.router.navigate(['/admin/categories']);
      }
    } else {
      this.router.navigate(['/admin/categories']);
    }
  }
}
