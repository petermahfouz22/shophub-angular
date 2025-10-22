import { Injectable, signal, effect } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private favoriteItem = signal<Product[]>(this.loadFromLocalStorage());

  productFavorite = this.favoriteItem.asReadonly();

  constructor() {
    // حفظ التغييرات تلقائياً في localStorage
    effect(() => {
      const items = this.favoriteItem();
      localStorage.setItem('favorite_products', JSON.stringify(items));
    });
  }

  // تحميل البيانات من localStorage
  private loadFromLocalStorage(): Product[] {
    if (typeof window === 'undefined') return [];

    try {
      const savedItems = localStorage.getItem('favorite_products');
      if (savedItems) {
        return JSON.parse(savedItems);
      }
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
    }
    return [];
  }

  // إضافة منتج للمفضلة
  addToFavorites(product: Product) {
    const currentItems = this.favoriteItem();

    // التحقق إذا المنتج موجود بالفعل
    const existingProduct = currentItems.find((item) => item.id === product.id);

    if (!existingProduct) {
      this.favoriteItem.set([...currentItems, product]);
    }
  }

  // إزالة منتج من المفضلة
  removeFromFavorites(productId: number) {
    const currentItems = this.favoriteItem();
    this.favoriteItem.set(currentItems.filter((item) => item.id !== productId));
  }

  // التحقق إذا المنتج في المفضلة
  isInFavorites(productId: number): boolean {
    return this.favoriteItem().some((item) => item.id === productId);
  }

  // عدد المنتجات في المفضلة
  getFavoritesCount(): number {
    return this.favoriteItem().length;
  }

  // تفريغ كل المفضلة
  clearFavorites() {
    this.favoriteItem.set([]);
  }

  // الحصول على منتج محدد
  getFavoriteProduct(productId: number): Product | undefined {
    return this.favoriteItem().find((item) => item.id === productId);
  }

  // تحديث منتج في المفضلة
  updateFavoriteProduct(productId: number, updatedProduct: Partial<Product>) {
    const currentItems = this.favoriteItem();
    this.favoriteItem.set(
      currentItems.map((item) =>
        item.id === productId ? { ...item, ...updatedProduct } : item
      )
    );
  }
}
