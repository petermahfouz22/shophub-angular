import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
// import { LoginComponent } from './auth/login/login.component';
import { UsersComponent } from './users/users.component';
import { Component } from '@angular/core';
import {
  ProductDetailsComponent,
  // resolvePoductData,
} from './products/product-details/product-details.component';
import { CartComponent } from './products/cart/cart.component';
import { LoginComponent } from './auth/login/login.component';
import { FavoriteProductsComponent } from './products/favorite-products/favorite-products.component';
import { ContactUsComponent } from './support/contact-us/contact-us.component';
import { NewProductComponent } from './products/new-product/new-product.component';
import { FAQComponent } from './support/faq/faq.component';
import { TermsConditionsComponent } from './informations/terms-condtions/terms-condtions.component';
import { PrivacyPolicyComponent } from './informations/privacy-policy/privacy-policy.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  {
    path: 'products/:id',
    component: ProductDetailsComponent,
    // resolve: {productData:resolvePoductData},
  },
  { path: 'favorites', component: FavoriteProductsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'users', component: UsersComponent },
  { path: 'login', component: LoginComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'new-product', component: NewProductComponent },
  { path: 'faq', component: FAQComponent },
  { path: 'terms', component: TermsConditionsComponent },
  { path: 'privacy', component: PrivacyPolicyComponent },
];
