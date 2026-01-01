import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../../services/product.service';
import { Product, Category, Brand } from '../../../../interfaces/product';

@Component({
  selector: 'app-new-product',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-product.component.html',
})
export class NewProductComponent implements OnInit {
  productForm: FormGroup;
  categories: Category[] = [];
  brands: Brand[] = [];
  isLoading = false;
  errorMessage = '';
  router = inject(Router);

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {
    this.productForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadFormData();
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
      brand_id: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      discount_price: ['', [Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      sku: ['', [Validators.required]],
      image_url: [''],
      gallery: [''],
      status: ['active', [Validators.required]],
    });
  }

  private loadFormData(): void {
    this.productService.adminGetFormData().subscribe({
      next: (response) => {
        console.log(response);
        // Access categories and brands from response.data
        this.categories = response.data.categories;
        this.brands = response.data.brands;
      },
      error: (error) => {
        console.error('Error loading form data:', error);
        this.errorMessage = 'Failed to load form data';
      },
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const formValue = this.productForm.value;

      // Create FormData for multipart/form-data submission
      const formData = new FormData();
      formData.append('name', formValue.name);
      formData.append('description', formValue.description);
      formData.append('category_id', formValue.category_id);
      formData.append('brand_id', formValue.brand_id);
      formData.append('price', formValue.price);
      formData.append('stock', formValue.stock);
      formData.append('sku', formValue.sku);
      formData.append('status', formValue.status);
      
      if (formValue.discount_price) {
        formData.append('discount_price', formValue.discount_price);
      }
      if (formValue.image_url) {
        formData.append('image_url', formValue.image_url);
      }
      if (formValue.gallery) {
        // Convert gallery string to array
        const galleryArray = formValue.gallery.split(',').map((url: string) => url.trim());
        galleryArray.forEach((url: string, index: number) => {
          formData.append(`gallery[${index}]`, url);
        });
      }

      this.productService.adminCreateProduct(formData).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.router.navigate(['/admin/products']);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage =
            error.error?.message || 'Failed to create product';
          console.error('Error creating product:', error);
        },
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.productForm.controls).forEach((key) => {
      const control = this.productForm.get(key);
      control?.markAsTouched();
    });
  }

  // Helper methods for template
  hasError(controlName: string, errorName: string): boolean {
    const control = this.productForm.get(controlName);
    return (control?.touched && control?.hasError(errorName)) || false;
  }

  isInvalid(controlName: string): boolean {
    const control = this.productForm.get(controlName);
    return (control?.touched && control?.invalid) || false;
  }
}
