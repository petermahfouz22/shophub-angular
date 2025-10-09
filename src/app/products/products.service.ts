import { Injectable, signal, inject } from '@angular/core';
import { category, Product } from './product';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private router = inject(Router);

  private productsList = signal<Product[]>([
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones',
      description:
        'High-quality wireless headphones with noise cancellation and long battery life.',
      price: 99.99,
      image:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=60',
      category: 'Electronics',
      rating: 4.5,
      reviews: 128,
      isNew: true,
    },
    {
      id: 2,
      name: 'Smart Watch Series 5',
      description:
        'Advanced smartwatch with health monitoring and GPS tracking.',
      price: 299.99,
      image:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=60',
      category: 'Wearables',
      rating: 4.8,
      reviews: 89,
      isNew: true,
    },
    {
      id: 3,
      name: 'Organic Cotton T-Shirt',
      description:
        'Comfortable and sustainable organic cotton t-shirt in various colors.',
      price: 29.99,
      image:
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=60',
      category: 'Fashion',
      rating: 4.3,
      reviews: 256,
      isNew: true,
    },
    {
      id: 4,
      name: 'Stainless Steel Water Bottle',
      description:
        'Eco-friendly insulated water bottle that keeps drinks hot or cold for hours.',
      price: 24.99,
      image:
        'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=500&q=60',
      category: 'Lifestyle',
      rating: 4.7,
      reviews: 167,
      isNew: true,
    },
    {
      id: 5,
      name: 'Gaming Mouse RGB',
      description:
        'Ergonomic gaming mouse with RGB lighting and programmable buttons.',
      price: 59.99,
      image:
        'https://images.unsplash.com/photo-1587202372775-98927b7d1d2c?auto=format&fit=crop&w=500&q=60',
      category: 'Electronics',
      rating: 4.6,
      reviews: 190,
      isNew: false,
    },
    {
      id: 6,
      name: 'Leather Wallet',
      description:
        'Classic genuine leather wallet with multiple card slots and RFID protection.',
      price: 39.99,
      image:
        'https://images.unsplash.com/photo-1618354691373-d851c5c8c2b5?auto=format&fit=crop&w=500&q=60',
      category: 'Accessories',
      rating: 4.4,
      reviews: 72,
      isNew: false,
    },
    {
      id: 7,
      name: 'Noise Cancelling Earbuds',
      description:
        'Compact true wireless earbuds with superior sound and noise cancellation.',
      price: 79.99,
      image:
        'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=500&q=60',
      category: 'Electronics',
      rating: 4.7,
      reviews: 210,
      isNew: false,
    },
    {
      id: 8,
      name: 'Yoga Mat Pro',
      description:
        'High-density, non-slip yoga mat suitable for all types of workouts.',
      price: 49.99,
      image:
        'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=500&q=60',
      category: 'Sports',
      rating: 4.9,
      reviews: 304,
      isNew: false,
    },
    {
      id: 9,
      name: 'Ceramic Coffee Mug',
      description:
        'Stylish ceramic mug with a minimalist design — perfect for your morning coffee.',
      price: 14.99,
      image:
        'https://images.unsplash.com/photo-1557925923-881d7e4820ba?auto=format&fit=crop&w=500&q=60',
      category: 'Kitchen',
      rating: 4.2,
      reviews: 98,
      isNew: false,
    },
    {
      id: 10,
      name: 'Running Shoes AirPro',
      description:
        'Lightweight and comfortable running shoes for all-day wear.',
      price: 119.99,
      image:
        'https://images.unsplash.com/photo-1513105737059-ff0cf0580b16?auto=format&fit=crop&w=500&q=60',
      category: 'Sports',
      rating: 4.5,
      reviews: 178,
      isNew: false,
    },
    {
      id: 11,
      name: 'Wireless Keyboard & Mouse Combo',
      description:
        'Slim and responsive wireless keyboard and mouse set for office and home use.',
      price: 69.99,
      image:
        'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=500&q=60',
      category: 'Electronics',
      rating: 4.4,
      reviews: 115,
      isNew: false,
    },
    {
      id: 12,
      name: 'LED Desk Lamp',
      description:
        'Adjustable LED desk lamp with touch control and multiple brightness levels.',
      price: 34.99,
      image:
        'https://images.unsplash.com/photo-1593642532400-2682810df593?auto=format&fit=crop&w=500&q=60',
      category: 'Home & Garden',
      rating: 4.6,
      reviews: 230,
      isNew: false,
    },
  ]);
  private categoriesList = signal<category[]>([
    { name: 'Electronics', count: 45 },
    { name: 'Fashion', count: 32 },
    { name: 'Home & Garden', count: 28 },
    { name: 'Sports', count: 19 },
    { name: 'Beauty', count: 24 },
  ]);
  
  products = this.productsList.asReadonly();
  categoties = this.categoriesList.asReadonly()

  routing(productId: number) {
    this.router.navigate(['products/', productId]);
  }
}
