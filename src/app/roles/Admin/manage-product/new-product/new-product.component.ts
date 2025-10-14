import { Component, signal, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-new-product',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent {
  private fb = inject(FormBuilder);
  
  productForm: FormGroup;
  isLoading = signal(false);
  isSubmitted = signal(false);
  imagePreview = signal<string | null>(null);

  // Product categories
  // categories: ProductCategory[] = [
  //   { id: 'electronics', name: 'Electronics' },
  //   { id: 'clothing', name: 'Clothing & Fashion' },
  //   { id: 'home', name: 'Home & Garden' },
  //   { id: 'sports', name: 'Sports & Outdoors' },
  //   { id: 'books', name: 'Books & Media' },
  //   { id: 'beauty', name: 'Beauty & Health' },
  //   { id: 'toys', name: 'Toys & Games' },
  //   { id: 'automotive', name: 'Automotive' }
  // ];

  // Product conditions
  conditions = [
    { value: 'new', label: 'New' },
    { value: 'used-like-new', label: 'Used - Like New' },
    { value: 'used-good', label: 'Used - Good' },
    { value: 'used-fair', label: 'Used - Fair' }
  ];

  constructor() {
    this.productForm = this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      // Basic Information
      productName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      productDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      category: ['', Validators.required],
      brand: ['', [Validators.required, Validators.minLength(2)]],
      
      // Pricing
      price: ['', [Validators.required, Validators.min(0.01), Validators.max(100000)]],
      comparePrice: ['', [Validators.min(0.01), Validators.max(100000)]],
      costPerItem: ['', [Validators.min(0), Validators.max(100000)]],
      
      // Inventory
      sku: [''],
      barcode: [''],
      quantity: ['', [Validators.required, Validators.min(0), Validators.max(10000)]],
      trackQuantity: [true],
      continueSelling: [false],
      
      // Shipping
      weight: ['', [Validators.min(0)]],
      weightUnit: ['kg'],
      requiresShipping: [true],
      
      // Product Details
      condition: ['new', Validators.required],
      tags: [''],
      
      // Media
      productImages: [null],
      
      // SEO
      seoTitle: [''],
      seoDescription: [''],
      
      // Status
      status: ['draft', Validators.required]
    });
  }

  // Form field getters
  get productName() { return this.productForm.get('productName'); }
  get productDescription() { return this.productForm.get('productDescription'); }
  get category() { return this.productForm.get('category'); }
  get brand() { return this.productForm.get('brand'); }
  get price() { return this.productForm.get('price'); }
  get comparePrice() { return this.productForm.get('comparePrice'); }
  get costPerItem() { return this.productForm.get('costPerItem'); }
  get quantity() { return this.productForm.get('quantity'); }
  get weight() { return this.productForm.get('weight'); }
  get condition() { return this.productForm.get('condition'); }
  get status() { return this.productForm.get('status'); }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        alert('Please select a valid image file (JPEG, PNG, or WebP)');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      this.productForm.patchValue({ productImages: file });
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview.set(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.imagePreview.set(null);
    this.productForm.patchValue({ productImages: null });
  }

  generateSKU(): void {
    const sku = `SKU-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    this.productForm.patchValue({ sku });
  }

  generateBarcode(): void {
    const barcode = Math.random().toString().substr(2, 12);
    this.productForm.patchValue({ barcode });
  }

  calculateProfit(): number {
    const price = this.price?.value || 0;
    const cost = this.costPerItem?.value || 0;
    return price - cost;
  }

  calculateMargin(): number {
    const price = this.price?.value || 0;
    const cost = this.costPerItem?.value || 0;
    if (price === 0) return 0;
    return ((price - cost) / price) * 100;
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.isLoading.set(true);
      
      // Simulate API call
      setTimeout(() => {
        console.log('Product Data:', this.productForm.value);
        this.isLoading.set(false);
        this.isSubmitted.set(true);
        
        // Reset form after successful submission
        setTimeout(() => {
          this.isSubmitted.set(false);
          this.productForm.reset({
            trackQuantity: true,
            requiresShipping: true,
            condition: 'new',
            weightUnit: 'kg',
            status: 'draft'
          });
          this.imagePreview.set(null);
        }, 3000);
      }, 2000);
    } else {
      this.markFormGroupTouched();
    }
  }

  onSaveDraft(): void {
    this.productForm.patchValue({ status: 'draft' });
    this.onSubmit();
  }

  onPublish(): void {
    this.productForm.patchValue({ status: 'active' });
    this.onSubmit();
  }

  private markFormGroupTouched(): void {
    Object.keys(this.productForm.controls).forEach(key => {
      const control = this.productForm.get(key);
      control?.markAsTouched();
    });
  }

  // Error messages
  getErrorMessage(controlName: string): string {
    const control = this.productForm.get(controlName);
    
    if (control?.errors?.['required'] && control.touched) {
      return 'This field is required';
    }
    
    if (control?.errors?.['minlength'] && control.touched) {
      return `Minimum ${control.errors?.['minlength'].requiredLength} characters required`;
    }
    
    if (control?.errors?.['maxlength'] && control.touched) {
      return `Maximum ${control.errors?.['maxlength'].requiredLength} characters allowed`;
    }
    
    if (control?.errors?.['min'] && control.touched) {
      return `Minimum value is ${control.errors?.['min'].min}`;
    }
    
    if (control?.errors?.['max'] && control.touched) {
      return `Maximum value is ${control.errors?.['max'].max}`;
    }
    
    if (control?.errors?.['email'] && control.touched) {
      return 'Please enter a valid email address';
    }
    
    return '';
  }
}
