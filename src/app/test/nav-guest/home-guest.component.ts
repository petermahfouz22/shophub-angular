import { Component } from '@angular/core';
import { MobileMenueService } from '../../header/nav/mobile-menu.service';
import { NavComponent } from "../shared/nav/nav.component";

@Component({
  selector: 'app-home-guest',
  imports: [NavComponent],
  templateUrl: './home-guest.component.html',
})
export class HomeGuestComponent {
  constructor(private mobileMenuService: MobileMenueService){}
  closeMobileMenu(): void {
    this.mobileMenuService.close();
  }
  
}
