import { Component, inject, OnInit } from '@angular/core';
import { ProductComponent } from '../../products/product/product.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-featured-products',
  imports: [ProductComponent],
  templateUrl: './featured-products.component.html',
})
export class FeaturedProductsComponent implements OnInit {
  products: Product[] = [];
  private productService = inject(ProductService);
  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data.slice(0, 4);
      },
    });
  }
}
