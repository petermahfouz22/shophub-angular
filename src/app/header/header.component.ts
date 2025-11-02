import { Component } from '@angular/core';
import { NavComponent } from './nav/nav.component';
// import { SearchComponent } from "./search/search.component";

@Component({
  selector: 'app-header',
  imports: [NavComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent {}
