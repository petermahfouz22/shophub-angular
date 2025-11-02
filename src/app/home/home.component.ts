import { Component } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { FeaturedProductsComponent } from './featured-products/featured-products.component';

@Component({
  selector: 'app-home',
  imports: [HeroComponent, FeaturedProductsComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
