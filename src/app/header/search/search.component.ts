import { Component, inject, signal } from '@angular/core';
import { ProductsService } from '../../products/products.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  private productsService = inject(ProductsService);
  constructor(private router: Router) {}

  products = this.productsService.products();
  filteredProducts = [...this.products];
  searchInput = '';
  search() {
    const searchTerm = this.searchInput.toLowerCase().trim();

    if (!searchTerm) {
      this.filteredProducts = this.products;
      return;
    }

    const startsWithMatches = this.products.filter((e) =>
      e.name.toLowerCase().startsWith(searchTerm)
    );

    const includesMatches = this.products.filter(
      (e) =>
        !e.name.toLowerCase().startsWith(searchTerm) &&
        e.name.toLowerCase().includes(searchTerm)
    );

    this.filteredProducts = [...startsWithMatches, ...includesMatches];
  }

  routing(product: number) {
    // console.log(product);
    this.router.navigate(['/products', product]);
    this.searchInput = '';
  }
}
