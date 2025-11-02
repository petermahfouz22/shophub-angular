import { Component, inject } from '@angular/core';
import { ProductListPaginationComponent } from './product-list-pagination/product-list-pagination.component';

@Component({
  selector: 'app-products',
  imports: [ProductListPaginationComponent],
  templateUrl: './products.component.html',
})
export class ProductsComponent {}
