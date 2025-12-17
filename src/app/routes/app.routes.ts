import { Routes } from '@angular/router';
import { routes as CustomerRoutes } from './customer.routes';
import { routes as AdminRoutes } from './admin.routes';
import { routes as AuthRoutes } from './auth.routes';
import { HomeComponent } from '../home/home.component';

export const routes: Routes = [
  // 💠 Default Route (Home)
  {
    path: '',
    component: HomeComponent,
    data: { wantSearch: true },
  },

  //? Auth routes
  ...AuthRoutes,

  // ? Customer routes
  ...CustomerRoutes,

  // ? Admin routes
  ...AdminRoutes,

  // ? Shared routes (Admin & Customer)
  {
    path: 'profile',
    loadComponent: () =>
      import('../profile/profile.component').then((m) => m.ProfileComponent),
  },
  {
    path: 'setting',
    loadComponent: () =>
      import('../setting/setting.component').then((m) => m.SettingComponent),
  },

  // 💠 404 Not Found
  {
    path: '**',
    loadComponent: () =>
      import('../not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];
