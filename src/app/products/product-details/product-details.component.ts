import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { ProductsService } from '../products.service';
import { Product } from '../product';
import { CartService } from '../cart/cart.service';
import { RouterLink } from '@angular/router';
import { FavoriteService } from '../favorite-products/favorite.service';
@Component({
  selector: 'app-product-details',
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  isSignedUser: boolean = true;
  constructor(
    private activatedRouter: ActivatedRoute,
    private productsService: ProductsService,
    private cartService: CartService,
    private favoriteService: FavoriteService
  ) {}

  product?: Product;

  onAddToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  isFavorite(): boolean {
    return this.product
      ? this.favoriteService.isInFavorites(this.product.id)
      : false;
  }

  toggleFavorite(): void {
    if (this.product) {
      if (this.isFavorite()) {
        this.favoriteService.removeFromFavorites(this.product.id);
      } else {
        this.favoriteService.addToFavorites(this.product);
      }
    }
  }

  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe({
      next: (data) => {
        this.product = this.productsService
          .products()
          .find((e) => e.id === Number(data.get('id')));
        // console.log(this.product);

        // console.log(
        //   this.productsService
        //     .products()
        //     .find((e) => e.id === Number(data.get('id')))
        // );
        // console.log(this.product);
      },
    });
  }
  // private route = inject(ActivatedRoute);
  // productData!: Product;
  // ngOnInit(): void {
  //   this.productData = this.route.snapshot.data['productData'];
  //   console.log('Resolved Product:', this.productData);
  // }
}
// export const resolvePoductData: ResolveFn<Product | undefined> = (
//   activatedRoute: ActivatedRouteSnapshot,
//   routerState: RouterStateSnapshot
// ) => {
//   const productsService = inject(ProductsService);
//   const productData = productsService
//     .products()
//     .find((p) => p.id === Number(activatedRoute.paramMap.get('id')));
//   return productData;
// };
