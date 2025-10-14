import { Component } from '@angular/core';
import { NavComponent } from '../shared/nav/nav.component';
import { MobileMenueService } from '../../header/nav/mobile-menu.service';

@Component({
  selector: 'app-home-user',
  imports: [NavComponent],
  templateUrl: './home-user.component.html',
})
export class HomeUserComponent {
  constructor(private mobileMenuService: MobileMenueService){};
  closeMobileMenu(): void {
    this.mobileMenuService.close();
  }
}
