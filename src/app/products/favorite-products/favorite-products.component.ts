import { Component, inject, signal, computed } from '@angular/core';
import { FavoriteService } from './favorite.service';
import { Product } from '../product';
import { FormsModule } from '@angular/forms';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-favorite-products',
  imports: [FormsModule],
  templateUrl: './favorite-products.component.html',
  styleUrl: './favorite-products.component.css',
})
export class FavoriteProductsComponent {
  private cartService = inject(CartService);
  private favoriteService = inject(FavoriteService);
  favoriteProducts = this.favoriteService.productFavorite;
  searchInput = signal<string>('');

  // المنتجات المصفاة بناءً على البحث
  filteredProducts = computed(() => {
    const searchTerm = this.searchInput().toLowerCase().trim();
    const products = this.favoriteProducts();

    if (!searchTerm) {
      return products;
    }

    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
  });

  // عدد المنتجات المفضلة
  favoritesCount = computed(() => this.favoriteProducts().length);

  // البحث في المنتجات
  searchItem(): void {
    // البحث يتم تلقائياً عبر الـ computed property
    console.log('Searching for:', this.searchInput());
  }

  // مسح البحث
  clearSearch(): void {
    this.searchInput.set('');
  }

  // إزالة منتج من المفضلة
  removeFromFavorites(product: Product): void {
    this.favoriteService.removeFromFavorites(product.id);
  }
  onAddToCart(product: Product) {
    this.cartService.addToCart(product);
  }
  // Add these variables to your component
  selectedCategory: string = '';
  selectedSort: string = 'newest';
  selectedPriceRange: string = '';
  viewMode: 'grid' | 'list' = 'grid';

  // Add these methods to your component
  applyFilters() {
    // This will be called whenever any filter changes
    // Your existing filtering logic should go here
    console.log('Filters applied:', {
      category: this.selectedCategory,
      sort: this.selectedSort,
      priceRange: this.selectedPriceRange,
      viewMode: this.viewMode,
    });
  }

  setViewMode(mode: 'grid' | 'list') {
    this.viewMode = mode;
  }

  clearCategoryFilter() {
    this.selectedCategory = '';
    this.applyFilters();
  }

  clearPriceFilter() {
    this.selectedPriceRange = '';
    this.applyFilters();
  }

  clearSortFilter() {
    this.selectedSort = 'newest';
    this.applyFilters();
  }

  clearAllFilters() {
    this.selectedCategory = '';
    this.selectedSort = 'newest';
    this.selectedPriceRange = '';
    this.applyFilters();
  }

  hasActiveFilters(): boolean {
    return (
      !!this.selectedCategory ||
      !!this.selectedPriceRange ||
      this.selectedSort !== 'newest'
    );
  }

  getCategoryDisplayName(category: string): string {
    const names: { [key: string]: string } = {
      electronics: 'Electronics',
      clothing: 'Fashion',
      home: 'Home & Garden',
      sports: 'Sports',
    };
    return names[category] || category;
  }

  getPriceRangeDisplayName(range: string): string {
    const names: { [key: string]: string } = {
      '0-50': 'Price: $0 - $50',
      '50-100': 'Price: $50 - $100',
      '100-200': 'Price: $100 - $200',
      '200-500': 'Price: $200 - $500',
      '500+': 'Price: $500+',
    };
    return names[range] || range;
  }

  getSortDisplayName(sort: string): string {
    const names: { [key: string]: string } = {
      newest: 'Newest First',
      oldest: 'Oldest First',
      'price-low': 'Price: Low to High',
      'price-high': 'Price: High to Low',
      name: 'Name A-Z',
    };
    return names[sort] || sort;
  }
}
