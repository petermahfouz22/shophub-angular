import { Component,signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { NavComponent } from "./test/shared/nav/nav.component";
import { HomeGuestComponent } from "./test/nav-guest/home-guest.component";
import { HomeUserComponent } from "./test/nav-user/home-user.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, NavComponent, HomeGuestComponent, HomeUserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  user = signal(false)
  title = 'e-commerce';
}
