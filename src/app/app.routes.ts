import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
// import { LoginComponent } from './auth/login/login.component';
// import { AuthGuard } from './guards/auth.guard';
// import { roleGuard } from './guards/role.guard';
import {
  ProductDetailsComponent,
  // resolvePoductData,
} from './products/product-details/product-details.component';
import { CartComponent } from './products/cart/cart.component';
import { LoginComponent } from './auth/login/login.component';
import { FavoriteProductsComponent } from './products/favorite-products/favorite-products.component';
import { ContactUsComponent } from './support/contact-us/contact-us.component';
import { FAQComponent } from './support/faq/faq.component';
import { TermsConditionsComponent } from './informations/terms-condtions/terms-condtions.component';
import { PrivacyPolicyComponent } from './informations/privacy-policy/privacy-policy.component';
import { PaymentComponent } from './payment/payment.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UsersComponent } from './roles/Admin/manage-users/users/users.component';
import {
  UserDetailsComponent,
  resolveUserData,
} from './roles/Admin/manage-users/users/user-details/user-details.component';
// import { NewProductComponent } from './roles/Admin/manage-products/new-product/new-product.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './roles/User/edit-profile/edit-profile.component';
import { SettingComponent } from './setting/setting.component';
import { GoogleCallbackComponent } from './auth/google-callback/google-callback.component';
export const routes: Routes = [
  //?default-Route----------------------------
  {
    path: '',
    component: HomeComponent,
    data: {
      wantSearch: true,
    },
  },
  //?------------------------------------------
  //?home(guest|user)--------------------------------------
  {
    path: 'home',
    component: HomeComponent,
    data: {
      wantSearch: true,
    },
  },
  //?Auth--------------------------------------
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'auth/google/callback', component: GoogleCallbackComponent },

  //?------------------------------------------

  //?products----------------------------------
  {
    path: 'products',
    component: ProductsComponent,
    data: {
      wantSearch: true,
    },
  },
  {
    path: 'products/:id',
    component: ProductDetailsComponent,
    data: {
      wantSearch: true,
    },
    // resolve: {productData:resolvePoductData},
  },
  //?------------------------------------------

  //?userSection-------------------------------
  { path: 'users', component: UsersComponent },
  {
    path: 'users/:id',
    component: UserDetailsComponent,
    resolve: { userData: resolveUserData },
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'profile/edit/:id',
    component: EditProfileComponent,
  },
  {
    path: 'setting',
    component: SettingComponent,
  },
  //?storage products--------------------------
  {
    path: 'favorites',
    component: FavoriteProductsComponent,
  },
  { path: 'cart', component: CartComponent },
  //?------------------------------------------
  //?payment-----------------------------------
  {
    path: 'payment',
    component: PaymentComponent,
  },
  //?Support---------------------------------
  { path: 'faq', component: FAQComponent },
  { path: 'contact-us', component: ContactUsComponent },
  {
    path: 'terms',
    component: TermsConditionsComponent,
    data: { wantSearch: false },
  },
  {
    path: 'privacy',
    component: PrivacyPolicyComponent,
    data: {
      wantSearch: false,
    },
  },
  //?-----------------------------------------

  //?NotFound page ---------------------------
  {
    path: '**',
    component: NotFoundComponent,
  },
  //?-----------------------------------------
];
