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
  private cartService = inject(CartService)
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
}
