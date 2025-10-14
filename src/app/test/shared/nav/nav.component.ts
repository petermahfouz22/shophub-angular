import {
  Component,
  inject,
  OnInit,
  signal,
  effect,
  computed,
} from '@angular/core';
// import { SearchComponent } from "../search/search.component";
import {
  RouterLink,
  RouterLinkActive,
  Router,
  NavigationEnd,
  ActivatedRoute,
  Route,
} from '@angular/router';
import { SearchComponent } from '../../../header/search/search.component';
import { CartService } from '../../../products/cart/cart.service';
import { NgIf } from '@angular/common';
import { FavoriteService } from '../../../products/favorite-products/favorite.service';
import { filter } from 'rxjs/operators';
import { MobileMenueService } from '../../../header/nav/mobile-menu.service';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive, SearchComponent, NgIf],
  templateUrl: './nav.component.html',
})
export class NavComponent {
  wantSearch = false;
  cartCounter = computed(() => this.cartService.getTotalItems());
  favoriteCounter = computed(
    () => this.favoriteService.productFavorite().length
  );
  private currentRoute: string = '';
  constructor(
    private mobileMenuService: MobileMenueService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private favoriteService: FavoriteService,
    private router: Router
  ) {
    // تتبع تغييرات الـ route
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.url;
      });
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        let child = this.route.firstChild;
        while (child?.firstChild) {
          child = child.firstChild;
        }
        this.wantSearch = child?.snapshot.data['wantSearch'] ?? false;
      });
  }

  // التحقق إذا الرابط نشط
  isActive(route: string): boolean {
    return this.currentRoute === route;
  }
  isMobileMenuOpen = false;

  ngOnInit(): void {
    this.mobileMenuService.isOpen$.subscribe((isOpen) => {
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
