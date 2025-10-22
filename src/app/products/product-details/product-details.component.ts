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
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  isSignedUser: boolean = true;
  item_quantity = signal(0);
  product?: Product;
  constructor(
    private activatedRouter: ActivatedRoute,
    private ProductService: ProductService,
    private cartService: CartService,
    private favoriteService: FavoriteService
  ) {}
  increaseQuantity() {
    this.item_quantity.set(this.item_quantity() + 1);
  }
  decreaseQuantity() {
    this.item_quantity.set(
      this.item_quantity() - 1 < 1 ? 1 : this.item_quantity() - 1
    );
  }

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
        this.product = this.ProductService.products().find(
          (e) => e.id === Number(data.get('id'))
        );
        // console.log(this.product);

        // console.log(
        //   this.ProductService
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
//   const ProductService = inject(ProductService);
//   const productData = ProductService
//     .products()
//     .find((p) => p.id === Number(activatedRoute.paramMap.get('id')));
//   return productData;
// };
