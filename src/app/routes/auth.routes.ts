import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'signup',
    loadComponent: () =>
      import('../auth/sign-up/sign-up.component').then(m => m.SignUpComponent)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('../auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'auth/google/callback',
    loadComponent: () =>
      import('../auth/google-callback/google-callback.component')
        .then(m => m.GoogleCallbackComponent)
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('../auth/forget-password/forget-password.component')
        .then(m => m.ForgotPasswordComponent)
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import('../auth/forget-password/reset-password/reset-password.component')
        .then(m => m.ResetPasswordComponent)
  }
];





// import { Routes } from '@angular/router';
// import { GoogleCallbackComponent } from '../auth/google-callback/google-callback.component';

// import { ForgotPasswordComponent } from '../auth/forget-password/forget-password.component';

// import { ResetPasswordComponent } from '../auth/forget-password/reset-password/reset-password.component';

// import { SignUpComponent } from '../auth/sign-up/sign-up.component';

// import { LoginComponent } from '../auth/login/login.component';

// export const routes: Routes = [
//   { path: 'signup', component: SignUpComponent },
//   { path: 'login', component: LoginComponent },
//   { path: 'auth/google/callback', component: GoogleCallbackComponent },
//   { path: 'forgot-password', component: ForgotPasswordComponent },
//   { path: 'reset-password', component: ResetPasswordComponent },
// ];
