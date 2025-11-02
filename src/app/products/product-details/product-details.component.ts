import {
  Component,
  // computed,
  // inject,
  // input,
  OnInit,
  signal,
} from '@angular/core';
import {
  ActivatedRoute,
  // ActivatedRouteSnapshot,
  // ResolveFn,
  // Router,
  // RouterStateSnapshot,
} from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { CartService } from './../../services/cart.service';
import { RouterLink } from '@angular/router';
import { FavoriteService } from '../../services/favorite.service';
@Component({
  selector: 'app-product-details',
  imports: [NgFor, NgIf, RouterLink],
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
    this.productService.getProduct(id).subscribe({
      next: (data) => (this.product = data),
      error: (err) => console.error(err),
    });
  }
}
// export const resolvePoductData: ResolveFn<Product | undefined> = (
//   activatedRoute: ActivatedRouteSnapshot,
//   routerState: RouterStateSnapshot
// ) => {
//   const ProductService = inject(ProductService);
//   const productData = ProductService
//     .products()
//     .find((p) => p.id === Number(activatedRoute.paramMap.get('id')));
//   return productData;
// };
