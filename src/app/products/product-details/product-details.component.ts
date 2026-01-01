import {
  Component,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService, ProductResponse } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { CartService } from './../../services/cart.service';
import { RouterLink } from '@angular/router';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent implements OnInit {
  product?: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe({
      next: (response: ProductResponse) => {
        // Extract product from response.data
        this.product = response.data;
      },
      error: (err) => console.error(err),
    });
  }
}
