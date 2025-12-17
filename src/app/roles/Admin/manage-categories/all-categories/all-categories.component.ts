// src/app/admin/categories/category-list/category-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../services/category.service';
import { Category } from '../../../../interfaces/category';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePipe, CommonModule } from '@angular/common';
import { LoaderComponent } from '../../../../shared/loader/loader.component';
@Component({
  selector: 'app-all-categories',
  imports: [RouterLink, FormsModule, CommonModule, LoaderComponent],
  templateUrl: './all-categories.component.html',
  styles: ``,
})
export class AllCategoriesComponent implements OnInit {
  categories: Category[] = [];
  parentCategories: Category[] = [];
  currentPage = 1;
  totalPages = 1;
  totalItems = 0;
  perPage = 10;

  searchTerm = '';
  statusFilter = '';
  parentFilter = '';

  isLoading = false;
  errorMessage = '';

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadParentCategories();
  }

  loadCategories(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.categoryService
      .getCategories(
        this.currentPage,
        this.perPage,
        this.searchTerm,
        this.statusFilter
        // this.parentFilter
      )
      .subscribe({
        next: (response) => {
          this.categories = response.data.data;
          this.currentPage = response.data.current_page;
          this.totalPages = response.data.last_page;
          this.totalItems = response.data.total;
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = 'Failed to load categories';
          this.isLoading = false;
          console.error('Error loading categories:', error);
        },
      });
  }

  loadParentCategories(): void {
    this.categoryService.getParentCategories().subscribe({
      next: (response) => {
        this.parentCategories = response.data;
      },
      error: (error) => {
        console.error('Error loading parent categories:', error);
      },
    });
  }
  // في AllCategoriesComponent
  getImageUrl(imageUrl: string | null): string {
    if (!imageUrl) {
      return 'https://via.placeholder.com/50x50?text=No+Image';
    }

    console.log('Original image URL from DB:', imageUrl);

    // إذا كان المسار يبدأ بـ /storage/
    if (imageUrl.startsWith('/storage/')) {
      // قم بتحويل المسار إلى URL كامل
      const fullUrl = `http://localhost:8000${imageUrl}`;
      console.log('Converted to full URL:', fullUrl);
      return fullUrl;
    }

    // إذا كان المسار كاملاً بالفعل
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }

    return imageUrl;
  }
  onSearch(): void {
    this.currentPage = 1;
    this.loadCategories();
  }

  onFilterChange(): void {
    this.currentPage = 1;
    this.loadCategories();
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadCategories();
    }
  }

  onToggleStatus(category: Category): void {
    const newStatus = category.status === 'active' ? 'inactive' : 'active';

    this.categoryService
      .updateCategoryStatus(category.id, newStatus)
      .subscribe({
        next: (response) => {
          category.status = newStatus;
        },
        error: (error) => {
          this.errorMessage = 'Failed to update category status';
          console.error('Error updating status:', error);
        },
      });
  }

  onDelete(category: Category): void {
    if (
      confirm(
        `Are you sure you want to delete "${category.name}"? This action cannot be undone.`
      )
    ) {
      this.categoryService.deleteCategory(category.id).subscribe({
        next: (response) => {
          this.loadCategories();
        },
        error: (error) => {
          this.errorMessage =
            error.error?.message || 'Failed to delete category';
          console.error('Error deleting category:', error);
        },
      });
    }
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getPages(): number[] {
    const pages = [];
    const startPage = Math.max(1, this.currentPage - 2);
    const endPage = Math.min(this.totalPages, this.currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }
}
