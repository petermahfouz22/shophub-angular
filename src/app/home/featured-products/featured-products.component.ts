import { Component, inject } from '@angular/core';
import { ProductComponent } from '../../products/product/product.component';
import { ProductsService } from '../../products/products.service';

@Component({
  selector: 'app-featured-products',
  imports: [ProductComponent],
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.css',
})
export class FeaturedProductsComponent {
  private productService = inject(ProductsService);
  products = this.productService.products();
  limitedProducts = this.products.slice(0, 4);
}
