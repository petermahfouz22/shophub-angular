import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../../../interfaces/product';
import { ProductService } from '../../../../services/product.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-show-product',
  imports: [CommonModule],
  templateUrl: './show-product.component.html',
})
export class ShowProductComponent implements OnInit {
  product!: Product;
  isLoading = false;
  successMessage = ''; // ✅ أضف ده
  errorMessage = '';
  private activatedRoute = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private router = inject(Router);
  ngOnInit(): void {
    // 📦 نجيب الـ id من الـ URL
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        const id = Number(params.get('id')); // ✅ حولها لرقم
        if (id) {
          this.getProductDetails(id);
        } else {
          this.errorMessage = 'Invalid product ID';
        }
      },
    });
  }
  getProductDetails(id: number) {
    this.isLoading = true;
    this.productService.adminGetProductById(id).subscribe({
      next: (data) => {
        this.product = data;
        console.log(data);
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load product details';
        this.isLoading = false;
      },
    });
  }

  // 🟢 Update Product Status (toggle)
  onToggleStatus() {
    if (!this.product) return;
    this.productService.adminToggleProductStatus(this.product.id!).subscribe({
      next: (res) => {
        this.successMessage = res.message;
        this.product = res.product; // update UI immediately
      },
      error: () => {
        this.errorMessage = 'Failed to update product status.';
      },
    });
  }

  // 🟡 Edit Product
  onEdit() {
    if (!this.product) return;
    this.router.navigate(['/admin/products/edit', this.product.id]);
  }

  // 🔴 Delete Product
  onDelete() {
    if (!this.product) return;
    const confirmDelete = confirm(
      `Are you sure you want to delete "${this.product.name}"?`
    );
    if (!confirmDelete) return;

    this.productService.adminDeleteProduct(this.product.id!).subscribe({
      next: (res) => {
        alert(res.message);
        this.router.navigate(['/admin/products']);
      },
      error: () => {
        this.errorMessage = 'Failed to delete product.';
      },
    });
  }

  // 🔙 Go Back to List
  goBack() {
    this.router.navigate(['/admin/products']);
  }
}
