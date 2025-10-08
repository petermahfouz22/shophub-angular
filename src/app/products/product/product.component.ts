import { Component, inject, input } from '@angular/core';
import { Product } from '../product';
import { CartService } from '../cart/cart.service';
import { FavoriteService } from '../favorite-products/favorite.service';
import { NgIf } from '@angular/common';
import { ProductsService } from '../products.service';
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
  private productService = inject(ProductsService);
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
