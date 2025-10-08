import { Component, inject, computed, effect } from '@angular/core';
import { CartService } from './cart.service';
import { CartItem } from './cart-item';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from "@angular/router"
@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
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
    this.cartService.increaseQuantity(item.id);
  }

  decreaseQuantity(item: CartItem) {
    this.cartService.decreaseQuantity(item.id);
  }

  removeItem(item: CartItem) {
    this.cartService.removeFromCart(item.id);
  }

  // constructor(){
  //   let user = {
  //     name:'peter',
  //     age:20,
  //   }

  //   console.log({...user,skill:'HTML'});
  // }
}
