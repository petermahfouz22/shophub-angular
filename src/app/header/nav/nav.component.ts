import {
  Component,
  inject,
  OnInit,
  signal,
  effect,
  computed,
} from '@angular/core';
// import { SearchComponent } from "../search/search.component";
import { RouterLink, RouterLinkActive,Router, NavigationEnd } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { CartService } from '../../products/cart/cart.service';
import { NgIf } from '@angular/common';
import { FavoriteService } from '../../products/favorite-products/favorite.service';
import { filter } from 'rxjs/operators';
import { MobileMenueService } from './mobile-menu.service';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive, SearchComponent, NgIf],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  private cartService = inject(CartService);
  private favoriteService = inject(FavoriteService);
  private router = inject(Router);
  // استخدم computed علشان تحسب العدد الإجمالي للمنتجات
  cartCounter = computed(() => this.cartService.getTotalItems());
  favoriteCounter = computed(
    () => this.favoriteService.productFavorite().length
  );

  private currentRoute: string = '';

  constructor(private mobileMenuService:MobileMenueService) {
    // تتبع تغييرات الـ route
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.url;
      });
  }

  // التحقق إذا الرابط نشط
  isActive(route: string): boolean {
    return this.currentRoute === route;
  }
    isMobileMenuOpen = false;


  ngOnInit(): void {
    this.mobileMenuService.isOpen$.subscribe(isOpen => {
      this.isMobileMenuOpen = isOpen;
    });
  }

  toggleMobileMenu(): void {
    this.mobileMenuService.toggle();
  }

  closeMobileMenu(): void {
    this.mobileMenuService.close();
  }
}
