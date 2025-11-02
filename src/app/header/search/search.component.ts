import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.component.html',
})
export class SearchComponent implements   OnInit{
  products:Product[]=[]
  private ProductService = inject(ProductService);
  constructor(private router: Router) {}
  ngOnInit():void{
    this.ProductService.getProducts().subscribe({
      next:(data)=>{
        this.products = data
      }
    })

  }
  // products = this.ProductService.products();
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

  // routing(product: number) {
  //   // console.log(product);
  //   this.router.navigate(['/products', product]);
  //   this.searchInput = '';
  // }
}
