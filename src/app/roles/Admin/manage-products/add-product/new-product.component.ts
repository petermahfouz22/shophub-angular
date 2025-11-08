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
export class NewProductComponent {
  productForm: FormGroup;
  categories: Category[] = [];
  brands: Brand[] = [];
  isLoading = false;
  errorMessage = '';
  router = inject(Router);
  constructor(
    private fb: FormBuilder,
    private productService: ProductService //  private router: Router
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
      next: (data) => {
        console.log(data);
        this.categories = data.categories;
        this.brands = data.brands;
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

      // Convert gallery string to array
      const productData: Product = {
        ...formValue,
        gallery: formValue.gallery
          ? formValue.gallery.split(',').map((url: string) => url.trim())
          : [],
        price: parseFloat(formValue.price),
        discount_price: formValue.discount_price
          ? parseFloat(formValue.discount_price)
          : undefined,
        stock: parseInt(formValue.stock, 10),
      };

      this.productService.adminCreateProduct(productData).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.router.navigate(['/products']);
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
