import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../../../../interfaces/user';

@Component({
  selector: 'app-users',
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  route = inject(Router);
  private userService = inject(UserService);
  users = signal<User[]>([]);
  // users = this.UserService.users();
  properties = signal<string[]>([]);

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users.set(data);
      if (this.users().length > 0) {
        this.properties.set(Object.keys(this.users()[0]).slice(0, -3));
      }
      console.log(this.properties());
      // console.log(data);
    });
  }
  onDelete(id: number) {
    this.userService.removeUser(id).subscribe({
      next: (res) => {
        console.log(res);
        this.users.set(this.users().filter((user) => user.id !== id));
      },
      error: (err) => console.error(err),
    });
  }
  routing(id: number) {
    this.route.navigate(['users/', id]);
  }
}
