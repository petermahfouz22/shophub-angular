import { Component, OnInit } from '@angular/core';
import { ProductService, PaginatedProductsResponse } from '../../../../services/product.service';
import { Product } from '../../../../interfaces/product';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LoaderComponent } from '../../../../shared/loader/loader.component';

@Component({
  selector: 'app-manage-products',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterLink, LoaderComponent],
  templateUrl: './all-products.component.html',
})
export class AllProductsComponent implements OnInit {
  // Product data
  allProducts: Product[] = [];
  products: Product[] = [];

  // UI state
  isLoading = false;
  errorMessage = '';

  // User filters
  searchTerm = '';
  statusFilter = '';

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;
  totalItems = 0;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.fetchProducts();
  }

  // Load all products
  fetchProducts() {
    this.isLoading = true;
    this.productService.adminGetProducts().subscribe({
      next: (response: PaginatedProductsResponse) => {
        // Handle paginated response
        if (response.data && response.data.data) {
          this.allProducts = response.data.data;
          this.totalItems = response.data.total;
          this.totalPages = response.data.last_page;
        }
        this.applyFilters();
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load products';
        this.isLoading = false;
      },
    });
  }

  // Apply filters
  applyFilters() {
    let filtered = [...this.allProducts];

    // Search filter
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          (p.sku && p.sku.toLowerCase().includes(term))
      );
    }

    // Status filter
    if (this.statusFilter) {
      filtered = filtered.filter((p) => p.status === this.statusFilter);
    }

    // Calculate pagination after filtering
    this.totalItems = filtered.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);

    // Apply local pagination
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.products = filtered.slice(startIndex, endIndex);
  }

  // Search handler
  onSearch() {
    console.log('Search term:', this.searchTerm);
    this.currentPage = 1;
    this.applyFilters();
  }

  // Filter change handler
  onFilterChange() {
    this.currentPage = 1;
    this.applyFilters();
  }

  // Page change handler
  onPageChange(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.applyFilters();
  }

  // Generate page numbers
  getPages(): number[] {
    return Array(this.totalPages)
      .fill(0)
      .map((_, i) => i + 1);
  }

  // Status badge styling
  getStatusBadgeClass(status: string) {
    return status === 'active'
      ? 'bg-green-100 text-green-800'
      : 'bg-gray-100 text-gray-800';
  }

  onEdit(product: Product) {}

  onDelete(product: Product) {
    if (!product?.id) return;

    const confirmDelete = confirm(
      `Are you sure you want to delete "${product.name}"?`
    );
    if (!confirmDelete) return;

    this.productService.adminDeleteProduct(product.id).subscribe({
      next: (res) => {
        console.log('✅ Deleted from API:', res);

        // Remove product from local arrays and update UI
        this.allProducts = this.allProducts.filter((p) => p.id !== product.id);
        this.applyFilters();

        alert(res.message || 'Product deleted successfully');
      },
      error: (err) => {
        console.error('❌ Delete error:', err);
        alert('Failed to delete product.');
      },
    });
  }

  onToggleStatus(product: Product): void {
    const action = product.status === 'active' ? 'deactivate' : 'activate';

    if (confirm(`Are you sure you want to ${action} "${product.name}"?`)) {
      this.productService.adminToggleProductStatus(product.id!).subscribe({
        next: (response) => {
          // Update the product status in the local array
          const index = this.products.findIndex((p) => p.id === product.id);
          if (index !== -1) {
            this.products[index].status = response.data.status;
          }

          // Also update in allProducts
          const allIndex = this.allProducts.findIndex((p) => p.id === product.id);
          if (allIndex !== -1) {
            this.allProducts[allIndex].status = response.data.status;
          }

          // Show success message
          alert(`Product ${action}d successfully!`);
        },
        error: (error) => {
          alert('Failed to update product status');
          console.error('Error updating status:', error);
        },
      });
    }
  }
}
