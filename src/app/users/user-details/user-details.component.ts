import { Component, inject } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { User } from '../user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-details',
  imports: [],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent {
  private route = inject(ActivatedRoute);
  userData?: User;

  ngOnInit(): void {
    this.route.data.subscribe(({ userData }) => {
      this.userData = userData;
      console.log('Loaded user:', this.userData);
    });
  }
}
export const resolveUserData: ResolveFn<User | undefined> = (route, state) => {
  const userService = inject(UsersService);
  const id = Number(route.paramMap.get('id'));
  return userService.getUserById(id);
};
