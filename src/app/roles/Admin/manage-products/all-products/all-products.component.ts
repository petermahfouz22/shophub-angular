import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { Product } from '../../../../interfaces/product';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Route, Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-manage-products',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './all-products.component.html',
})
export class AllProductsComponent implements OnInit {
  // 🔹 بيانات المنتجات
  allProducts: Product[] = [];
  products: Product[] = [];

  // 🔹 حالة الواجهة
  isLoading = false;
  errorMessage = '';

  // 🔹 فلاتر المستخدم
  searchTerm = '';
  statusFilter = '';

  // 🔹 Pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;
  totalItems = 0;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.fetchProducts();
  }

  // 🟢 تحميل كل المنتجات مرة واحدة
  fetchProducts() {
    this.isLoading = true;
    this.productService.adminGetProducts().subscribe({
      next: (data) => {
        this.allProducts = data;
        this.applyFilters(); // نفلتر ونعمل pagination محلي
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load products';
        this.isLoading = false;
      },
    });
  }

  // 🧠 تطبيق الفلاتر
  applyFilters() {
    let filtered = [...this.allProducts];

    // فلترة بالبحث
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          (p.sku && p.sku.toLowerCase().includes(term))
      );
    }

    // فلترة بالحالة
    if (this.statusFilter) {
      filtered = filtered.filter((p) => p.status === this.statusFilter);
    }

    // بعد الفلترة نحسب عدد الصفحات
    this.totalItems = filtered.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);

    // تطبيق pagination محلي
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.products = filtered.slice(startIndex, endIndex);
  }

  // 🔍 لما المستخدم يضغط Enter أو Search
  onSearch() {
    console.log('Search term:', this.searchTerm);
    this.currentPage = 1;
    this.applyFilters();
  }

  // 🔄 لما يغير الـ status filter
  onFilterChange() {
    this.currentPage = 1;
    this.applyFilters();
  }

  // 📄 تغيير الصفحة
  onPageChange(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.applyFilters();
  }

  // 🔢 توليد صفحات
  getPages(): number[] {
    return Array(this.totalPages)
      .fill(0)
      .map((_, i) => i + 1);
  }

  // 🎨 ألوان الـ status
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

        // ✨ نحذف المنتج من القائمتين المحلية عشان الواجهة تتحدث فورًا
        this.allProducts = this.allProducts.filter((p) => p.id !== product.id);
        this.applyFilters(); // نعيد تطبيق الفلترة والpagination بناءً على الجديد

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
            this.products[index].status = response.product.status;
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
