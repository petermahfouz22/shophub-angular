// src/app/admin/components/brand-list/brand-list.component.ts
import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../../../services/brand.service';
import {Brand, PaginatedBrands, BrandResponse} from '../../../../interfaces/brand'
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-brands',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './all-brands.component.html'
})
export class AllBrandsComponent implements OnInit {
  brands: Brand[] = [];
  paginatedBrands!: PaginatedBrands;
  loading = false;
  searchTerm = '';
  statusFilter = '';
  
  // Pagination
  currentPage = 1;
  perPage = 10;
  totalItems = 0;

  constructor(private brandService: BrandService) {
    console.log();
  }

  ngOnInit(): void {
    this.loadBrands();
  }

  loadBrands(): void {
    this.loading = true;
    
    const params: any = {
      page: this.currentPage,
      per_page: this.perPage
    };

    if (this.searchTerm) {
      params.search = this.searchTerm;
    }

    if (this.statusFilter) {
      params.status = this.statusFilter;
    }

    this.brandService.getBrands(params).subscribe({
      next: (response: BrandResponse) => {
        if (response.success) {
          this.paginatedBrands = response.data;
          this.brands = response.data.data;
          this.totalItems = response.data.total;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading brands:', error);
        this.loading = false;
      }
    });
  }

  onSearch(): void {
    this.currentPage = 1;
    this.loadBrands();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadBrands();
  }

  updateStatus(brand: Brand, newStatus: 'active' | 'inactive'): void {
    if (confirm(`Are you sure you want to ${newStatus === 'active' ? 'activate' : 'deactivate'} this brand?`)) {
      this.brandService.updateBrandStatus(brand.id!, newStatus).subscribe({
        next: (response: BrandResponse) => {
          if (response.success) {
            brand.status = newStatus;
            alert('Brand status updated successfully');
          } else {
            alert(response.message);
          }
        },
        error: (error) => {
          console.error('Error updating brand status:', error);
          alert('Error updating brand status');
        }
      });
    }
  }

  deleteBrand(id: number): void {
    if (confirm('Are you sure you want to delete this brand?')) {
      this.brandService.deleteBrand(id).subscribe({
        next: (response: BrandResponse) => {
          if (response.success) {
            this.loadBrands();
            alert('Brand deleted successfully');
          } else {
            alert(response.message);
          }
        },
        error: (error) => {
          console.error('Error deleting brand:', error);
          if (error.error?.message) {
            alert(error.error.message);
          } else {
            alert('Error deleting brand');
          }
        }
      });
    }
  }

  getStatusBadgeClass(status: string): string {
    return status === 'active' ? 'badge bg-success' : 'badge bg-secondary';
  }

  get totalPages(): number {
    return this.paginatedBrands?.last_page || 1;
  }

  get pages(): number[] {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }
}