import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../../../interfaces/product';
import { ProductService, ProductResponse } from '../../../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-product',
  imports: [CommonModule],
  templateUrl: './show-product.component.html',
})
export class ShowProductComponent implements OnInit {
  product!: Product;
  isLoading = false;
  successMessage = '';
  errorMessage = '';
  private activatedRoute = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private router = inject(Router);

  ngOnInit(): void {
    // Get ID from URL
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        const id = Number(params.get('id'));
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
      next: (response: ProductResponse) => {
        // Extract product from response.data
        this.product = response.data;
        console.log(response.data);
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load product details';
        this.isLoading = false;
      },
    });
  }

  // Toggle product status
  onToggleStatus() {
    if (!this.product) return;
    this.productService.adminToggleProductStatus(this.product.id!).subscribe({
      next: (res) => {
        this.successMessage = res.message;
        // Update product from response.data
        this.product = res.data;
      },
      error: () => {
        this.errorMessage = 'Failed to update product status.';
      },
    });
  }

  // Edit product
  onEdit() {
    if (!this.product) return;
    this.router.navigate(['/admin/products/edit', this.product.id]);
  }

  // Delete product
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

  // Go back to list
  goBack() {
    this.router.navigate(['/admin/products']);
  }
}
