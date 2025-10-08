import {
  Component,
  ElementRef,
  inject,
  QueryList,
  ViewChild,
  viewChild,
  ViewChildren,
} from '@angular/core';
import { Product } from '../product';
import { ProductComponent } from '../product/product.component';
import { ProductsService } from '../products.service';
import { Element } from '@angular/compiler';

@Component({
  selector: 'app-product-list-pagination',
  imports: [ProductComponent],
  templateUrl: './product-list-pagination.component.html',
  styleUrl: './product-list-pagination.component.css',
})
export class ProductListPaginationComponent {
  private productService = inject(ProductsService);
  products = this.productService.products();
  constructor() {
    // console.log(this.products);
  }

  @ViewChild('selectElem') selectElem!: ElementRef;
  @ViewChildren('divs') divs!: QueryList<ElementRef>;

  onSelect() {
    console.log(this.selectElem.nativeElement.value);
    this.divs.forEach((e) => {
      // console.log(e.nativeElement);
    });
  }
}
