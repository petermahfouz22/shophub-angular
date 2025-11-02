import { Component, inject, computed, effect } from '@angular/core';
import { CartService } from './../../services/cart.service';
import { CartItem } from '../../interfaces/cart-item';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',

})
export class CartComponent {
  private cartService = inject(CartService);
  items = this.cartService.productCart;

  // حسابات للملخص
  subtotal = computed(() => this.cartService.getTotalPrice());
  tax = computed(() => this.subtotal() * 0.08); // ضريبة 8%
  total = computed(() => this.subtotal() + this.tax());
  totalItems = computed(() => this.cartService.getTotalItems());

increaseQuantity(item: CartItem) {
  if (!item?.id) return;
  this.cartService.increaseQuantity(item.id!);
}

decreaseQuantity(item: CartItem) {
  if (!item?.id) return;
  this.cartService.decreaseQuantity(item.id!);
}

removeItem(item: CartItem) {
  if (!item?.id) return;
  this.cartService.removeFromCart(item.id!);
}
}
