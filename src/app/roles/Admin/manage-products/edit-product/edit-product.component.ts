import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../../services/product.service';
import { Category, Brand, Product } from '../../../../interfaces/product';

@Component({
  selector: 'app-edit-product',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-product.component.html',
})
export class EditProductComponent implements OnInit {
  form!: FormGroup;
  categories: Category[] = [];
  brands: Brand[] = [];
  productId!: number;

  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadFormData();

    // 👇 نحمل المنتج ونبني الـ form مباشرة بعد ما توصله البيانات
    this.productService.adminGetProductById(this.productId).subscribe({
      next: (product: Product) => {
        this.buildForm(product);
      },
      error: () => (this.errorMessage = 'Failed to load product.'),
    });
  }

  // ⬇️ هنا بنبني الـ form بالقيم الجاية من الـ API
  buildForm(product: Product): void {
    console.log(product.name);
    this.form = this.fb.group({
      name: [
        product.name || '',
        [Validators.required, Validators.maxLength(255)],
      ],
      description: [product.description || '', Validators.required],
      category_id: [product.category_id || null, Validators.required],
      brand_id: [product.brand_id || null, Validators.required],
      price: [product.price || 0, [Validators.required, Validators.min(0)]],
      discount_price: [product.discount_price || null, [Validators.min(0)]],
      stock: [product.stock || 0, [Validators.required, Validators.min(0)]],
      sku: [product.sku || '', Validators.required],
      image_url: [product.image_url || ''],
      gallery: this.fb.array(
        (product.gallery || []).map((url) =>
          this.fb.control(url, Validators.pattern(/^https?:\/\/.+/))
        )
      ),
      rating: [product.rating || null, [Validators.min(0), Validators.max(5)]],
      status: [product.status || 'active', Validators.required],
    });
  }

  get gallery(): FormArray {
    return this.form.get('gallery') as FormArray;
  }

  addGalleryUrl(url: string = '') {
    this.gallery.push(
      this.fb.control(url, Validators.pattern(/^https?:\/\/.+/))
    );
  }

  removeGalleryUrl(index: number) {
    this.gallery.removeAt(index);
  }

  loadFormData(): void {
    this.productService.adminGetFormData().subscribe({
      next: (res) => {
        this.categories = res.categories;
        this.brands = res.brands;
      },
    });
  }

  onSubmit(): void {
  if (!this.form || this.form.invalid) {
    this.form?.markAllAsTouched();
    return;
  }

  const updatedProduct = { ...this.form.value };
  
  // Log the actual data being sent
  console.log('🟡 Form Data:', this.form.value);
  console.log('🟡 Gallery Array:', this.gallery.value);
  console.log('🟡 Final Product Data:', updatedProduct);
  console.log('🟡 Product ID:', this.productId);

  this.productService
    .adminUpdateProduct(this.productId, updatedProduct)
    .subscribe({
      next: (res) => {
        this.successMessage = res.message;
        setTimeout(() => this.router.navigate(['/admin/products']), 1200);
      },
      error: (err) => {
        console.error('🔴 Update Error:', err);
        console.error('🔴 Error Details:', err.error);
        this.errorMessage = 'Failed to update product.';
      },
    });
}
}
