import {
  Component,
  inject,
  OnInit,
  // ElementRef,
  // QueryList,
  // ViewChild,
  // viewChild,
  // ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductComponent } from '../product/product.component';
import { ProductService } from '../../services/product.service';
import { Product, FilterState, category } from '../../interfaces/product';

@Component({
  selector: 'app-product-list-pagination',
  imports: [ProductComponent, CommonModule, FormsModule],
  templateUrl: './product-list-pagination.component.html',
})
export class ProductListPaginationComponent implements OnInit {
  // @ViewChild('selectElem') selectElem!: ElementRef;
  // @ViewChildren('divs') divs!: QueryList<ElementRef>;

  // onSelect() {
  //   console.log(this.selectElem.nativeElement.value);
  //   this.divs.forEach((e) => {
  //     // console.log(e.nativeElement);
  //   });
  // }
  private productService = inject(ProductService);
  products = this.productService.products();

  // Filter state
  filters: FilterState = {
    categories: [],
    maxPrice: 1000,
    minRating: 0,
  };

  // Sort state
  sortBy: string = 'name';

  // Pagination state
  currentPage: number = 1;
  itemsPerPage: number = 6;

  // Computed properties
  filteredProducts: Product[] = [];
  paginatedProducts: Product[] = [];
  totalPages: number = 0;
  totalProducts: number = 0;

  // Available categories
  categories: category[] = this.productService.categoties();

  ngOnInit() {
    this.applyFilters();
  }

  // Category filter handlers
  onCategoryChange(category: string, event: any) {
    if (event.target.checked) {
      this.filters.categories.push(category);
    } else {
      this.filters.categories = this.filters.categories.filter(
        (c) => c !== category
      );
    }
    this.currentPage = 1;
    this.applyFilters();
  }

  // Price filter handler
  onPriceChange(event: any) {
    this.filters.maxPrice = Number(event.target.value);
    this.currentPage = 1;
    this.applyFilters();
  }

  // Rating filter handler
  onRatingSelect(rating: number) {
    this.filters.minRating = rating;
    this.currentPage = 1;
    this.applyFilters();
  }

  // Sort handler
  onSortChange(event: any) {
    this.sortBy = event.target.value;
    this.applyFilters();
  }

  // Clear all filters
  clearFilters() {
    this.filters = {
      categories: [],
      maxPrice: 1000,
      minRating: 0,
    };
    this.sortBy = 'name';
    this.currentPage = 1;
    this.applyFilters();
  }

  // Apply all filters and sorting
  applyFilters() {
    let filtered = this.products.filter((product) => {
      // Category filter
      if (
        this.filters.categories.length > 0 &&
        !this.filters.categories.includes(product.category)
      ) {
        return false;
      }

      // Price filter
      if (product.price > this.filters.maxPrice) {
        return false;
      }

      // Rating filter
      if (product.rating < this.filters.minRating) {
        return false;
      }

      return true;
    });

    // Apply sorting
    filtered = this.sortProducts(filtered, this.sortBy);

    this.filteredProducts = filtered;
    this.totalProducts = filtered.length;
    this.totalPages = Math.ceil(this.totalProducts / this.itemsPerPage);

    this.updatePaginatedProducts();
  }

  // Sort products based on selected criteria
  sortProducts(products: Product[], sortBy: string): Product[] {
    switch (sortBy) {
      case 'price-low':
        return [...products].sort((a, b) => a.price - b.price);
      case 'price-high':
        return [...products].sort((a, b) => b.price - a.price);
      case 'rating':
        return [...products].sort((a, b) => b.rating - a.rating);
      case 'newest':
        return [...products].sort((a, b) => {
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return 0;
        });
      case 'name':
      default:
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
    }
  }

  // Pagination methods
  updatePaginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedProducts();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedProducts();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedProducts();
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(
      1,
      this.currentPage - Math.floor(maxVisiblePages / 2)
    );
    let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  // Helper to get display text for results count
  getResultsText(): string {
    const start = (this.currentPage - 1) * this.itemsPerPage + 1;
    const end = Math.min(
      this.currentPage * this.itemsPerPage,
      this.totalProducts
    );
    return `Showing ${start}-${end} of ${this.totalProducts} products`;
  }
}
