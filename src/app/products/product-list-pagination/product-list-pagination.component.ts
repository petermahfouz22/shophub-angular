import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductComponent } from '../product/product.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-product-list-pagination',
  imports: [ProductComponent, CommonModule, FormsModule, LoaderComponent],
  templateUrl: './product-list-pagination.component.html',
})
export class ProductListPaginationComponent implements OnInit {
  products: Product[] = [];
  isLoading = true;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false;
      },
      error: (err) => console.error(err),
    });
  }
}
