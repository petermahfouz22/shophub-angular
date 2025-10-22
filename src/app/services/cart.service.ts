import { Injectable, signal, effect } from '@angular/core';
import { Product } from '../interfaces/product';
import { CartItem } from '../interfaces/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = signal<CartItem[]>(this.loadCartFromStorage());

  productCart = this.cartItems.asReadonly();

  constructor() {
    // حفظ التغييرات تلقائياً في localStorage
    effect(() => {
      const items = this.cartItems();
      localStorage.setItem('shopping_cart', JSON.stringify(items));
    });
  }

  // تحميل السلة من localStorage
  private loadCartFromStorage(): CartItem[] {
    if (typeof window === 'undefined') return [];

    try {
      const savedCart = localStorage.getItem('shopping_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error loading cart from storage:', error);
      return [];
    }
  }

  // إضافة منتج للسلة
  addToCart(product: Omit<CartItem, 'quantity'>) {
    const currentItems = this.cartItems();
    const existingItem = currentItems.find((item) => item.id === product.id);

    if (existingItem) {
      this.cartItems.set(
        currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      this.cartItems.set([...currentItems, { ...product, quantity: 1 }]);
    }
  }

  // زيادة كمية منتج
  increaseQuantity(productId: number) {
    const currentItems = this.cartItems();
    this.cartItems.set(
      currentItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  // تقليل كمية منتج
  decreaseQuantity(productId: number) {
    const currentItems = this.cartItems();
    this.cartItems.set(
      currentItems.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  }

  // إزالة منتج من السلة
  removeFromCart(productId: number) {
    const currentItems = this.cartItems();
    this.cartItems.set(currentItems.filter((item) => item.id !== productId));
  }

  // تفريغ السلة تماماً
  clearCart() {
    this.cartItems.set([]);
  }

  // حساب المجموع الكلي
  getTotalPrice(): number {
    return this.cartItems().reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  // حساب عدد المنتجات الإجمالي
  getTotalItems(): number {
    return this.cartItems().reduce((total, item) => total + item.quantity, 0);
  }

  // الحصول على كمية منتج معين
  getItemQuantity(productId: number): number {
    const item = this.cartItems().find((item) => item.id === productId);
    return item ? item.quantity : 0;
  }
}
