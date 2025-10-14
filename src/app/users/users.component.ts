import { Component, inject, signal } from '@angular/core';
import { UsersService } from './users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  private usersService = inject(UsersService);
  users = this.usersService.users();
  properties = signal<string[]>([])
  constructor() {
    this.properties.set(Object.keys(this.users[0]).slice(0,-3));
  }
}
