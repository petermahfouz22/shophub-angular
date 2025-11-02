import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  computed,
  signal,
} from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';

import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CartService } from './../../services/cart.service';
import { FavoriteService } from '../../services/favorite.service';
import { SearchComponent } from '../search/search.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, SearchComponent, NgIf],
  templateUrl: './nav.component.html',
})
export class NavComponent implements OnInit, OnDestroy {
  // Services
  private authService = inject(AuthService);
  private cartService = inject(CartService);
  private favoriteService = inject(FavoriteService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private authSubscription!: Subscription;

  // Search & UI State
  wantSearch = false;
  isMobileMenuOpen = false; // إضافة هذا المتغير المطلوب في الـ template

  // Cart
  cartCounter = computed(() => this.cartService.getTotalItems());

  // Favorite
  favoriteCounter = computed(() => this.favoriteService.productFavorite());

  // Authentication
  isAuthenticated = false;
  isLoggingOut = false;
  firstLetter = signal('U');
  userName = signal('User');
  user = signal(this.authService.getCurrentUser());
  // إضافة هذا للإشارة إلى بيانات المستخدم

  // المتغيرات الإضافية
  f: any = null;

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentRoute = this.route.root.firstChild;
        this.wantSearch = currentRoute?.snapshot.data?.['wantSearch'] || false;
      });

    this.initializeAuth();

    this.authService.getCurrentUserObservable().subscribe((user) => {
      this.user.set(user);
      if (user) {
        this.userName.set(user.name || 'User');
        this.firstLetter.set(user.name?.charAt(0)?.toUpperCase() || 'U');
      }
    });
  }

  ngOnDestroy(): void {
    this.cleanupSubscriptions();
  }

  private initializeAuth(): void {
    // Subscribe to authentication state changes
    this.authSubscription = this.authService
      .getAuthState()
      .subscribe((isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
        this.updateUserInfo();
      });

    // Initialize with current state
    this.isAuthenticated = this.authService.isLoggedIn();
    this.updateUserInfo();
  }

  private cleanupSubscriptions(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  private updateUserInfo(): void {
    const user = this.authService.getCurrentUser();
    this.user.set(user);
    this.userName.set(user?.name || 'User');
    this.firstLetter.set(user?.name?.charAt(0)?.toUpperCase() || 'U');
  }

  // Navigation & UI Methods
  isActive(route: string): boolean {
    return this.router.url === route;
  }

  toggleSearch(): void {
    this.wantSearch = !this.wantSearch;
  }

  // Mobile Menu Methods
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  // Authentication Methods
  async onLogout(): Promise<void> {
    if (this.isLoggingOut) return;

    this.isLoggingOut = true;
    try {
      await this.authService.logout();
      this.closeMobileMenu(); // إغلاق القائمة بعد تسجيل الخروج
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.isLoggingOut = false;
    }
  }

  // Methods for favorite functionality
  toggleFavorite(): void {
    // implementation for favorite toggle
  }

  // Method for f variable if needed
  setF(value: any): void {
    this.f = value;
  }
}
