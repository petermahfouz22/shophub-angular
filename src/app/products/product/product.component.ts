import { Component, inject, Input } from '@angular/core';
import { Product } from '../../interfaces/product';
import { CartService } from '../../services/cart.service';
import { FavoriteService } from '../../services/favorite.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',

})
export class ProductComponent {
  @Input({ required: true }) product!: Product;
  constructor(
    private favoriteService: FavoriteService,
    private router: Router,
    private cartService: CartService
  ) {}

  onAddToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  isFavorite(): boolean {
    return this.favoriteService.isInFavorites(this.product.id!);
  }

  toggleFavorite(): void {
    if (this.isFavorite()) {
      this.favoriteService.removeFromFavorites(this.product.id!);
    } else {
      this.favoriteService.addToFavorites(this.product);
    }
  }

  routing(productId: number) {
    this.router.navigate(['/products', productId]); // ✅ يفتح صفحة تفاصيل المنتج
  }
}
