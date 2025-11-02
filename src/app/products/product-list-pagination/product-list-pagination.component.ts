import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductComponent } from '../product/product.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-product-list-pagination',
  imports: [ProductComponent, CommonModule, FormsModule],
  templateUrl: './product-list-pagination.component.html',
})
export class ProductListPaginationComponent implements OnInit {
  products: Product[] = [];
  loading = true;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => console.error(err),
    });
  }

  // deleteProduct(id: number): void {
  //   if (confirm('Are you sure you want to delete this product?')) {
  //     this.productService.delete(id).subscribe(() => {
  //       this.products = this.products.filter((p) => p.id !== id);
  //     });
  //   }
  // }
}
