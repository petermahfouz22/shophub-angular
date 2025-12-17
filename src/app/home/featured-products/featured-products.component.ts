import { Component, inject, OnInit } from '@angular/core';
import { ProductComponent } from '../../products/product/product.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-featured-products',
  imports: [ProductComponent,LoaderComponent],
  templateUrl: './featured-products.component.html',
})
export class FeaturedProductsComponent implements OnInit {
  products: Product[] = [];
  isLoading = true;
  private productService = inject(ProductService);
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data.slice(0, 4);
        this.isLoading = false;
      },
    });
  }
}
