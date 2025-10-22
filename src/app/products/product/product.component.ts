import { Component, inject, input } from '@angular/core';
import { Product } from '../../interfaces/product';
import { CartService } from './../../services/cart.service';
import { FavoriteService } from '../../services/favorite.service';
import { NgIf } from '@angular/common';
import { ProductService } from '../../services/product.service';
// import { ImageAspectRatioDirective } from '../product.directive';
@Component({
  selector: 'app-product',
  imports: [NgIf],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  product = input.required<Product>();
  private cartService = inject(CartService);
  private favoriteService = inject(FavoriteService);
  private productService = inject(ProductService);
  onAddToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  isFavorite(): boolean {
    return this.product
      ? this.favoriteService.isInFavorites(this.product().id)
      : false;
  }

  toggleFavorite(): void {
    if (this.product) {
      if (this.isFavorite()) {
        this.favoriteService.removeFromFavorites(this.product().id);
      } else {
        this.favoriteService.addToFavorites(this.product());
      }
    }
  }
  routing(productId: number) {
    this.productService.routing(productId);
  }
}
