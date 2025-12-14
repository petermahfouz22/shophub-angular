import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
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
import { IndexComponent } from './roles/Admin/manage-users/index/index.component';

import { ProfileComponent } from './profile/profile.component';
import { SettingComponent } from './setting/setting.component';
import { GoogleCallbackComponent } from './auth/google-callback/google-callback.component';
import { ForgotPasswordComponent } from './auth/forget-password/forget-password.component';
import { ResetPasswordComponent } from './auth/forget-password/reset-password/reset-password.component';
import { NewProductComponent } from './roles/Admin/manage-products/add-product/new-product.component';
import { AllProductsComponent } from './roles/Admin/manage-products/all-products/all-products.component';
import { EditProductComponent } from './roles/Admin/manage-products/edit-product/edit-product.component';
import { ShowProductComponent } from './roles/Admin/manage-products/show-product/show-product.component';
import { EditComponent } from './roles/Admin/manage-users/edit/edit.component';
import { ShowComponent } from './roles/Admin/manage-users/show/show.component';
import { AllCategoriesComponent } from './roles/Admin/manage-categories/all-categories/all-categories.component';
// import { ShowCategoryComponent } from './roles/Admin/manage-categories/show/show-category.component';
import { NewCategoryComponent } from './roles/Admin/manage-categories/new-category/new-category.component';
import { EditCategoryComponent } from './roles/Admin/manage-categories/edit-category/edit-category.component';
import { AllBrandsComponent } from './roles/Admin/manage-brands/index/all-brands.component';
import { NewBrandComponent } from './roles/Admin/manage-brands/create/new-brand.component';
import { EditBrandComponent } from './roles/Admin/manage-brands/edit/edit-brand.component';
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
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
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
  //?--------------------Admin--------------------
  {
    path: 'admin',
    children: [
      {
        //?--------------------manage-products--------------------
        path: 'products',
        children: [
          { path: '', component: AllProductsComponent },
          { path: 'create', component: NewProductComponent },
          { path: 'edit/:id', component: EditProductComponent },
          { path: ':id', component: ShowProductComponent },
        ],
      },
      // ... other routes
      {
        path: 'categories',
        children: [
          { path: '', component: AllCategoriesComponent },
          { path: 'create', component: NewCategoryComponent },
          { path: 'edit/:id', component: EditCategoryComponent },
          // {path:':id',component:ShowCategoryComponent}
        ],
      },
      {
        path: 'brands',
        children: [
          { path: '', component: AllBrandsComponent },
          { path: 'create', component: NewBrandComponent },
          { path: 'edit/:id', component: EditBrandComponent },
        ],
      },
      //       {
      //   path: 'brands',
      //   children: [
      //     { path: '', component: BrandListComponent },
      //     { path: 'create', component: BrandFormComponent },
      //     { path: 'edit/:id', component: BrandFormComponent }
      //   ]
      // }
      {
        //?--------------------manage-users--------------------
        path: 'users',
        children: [
          { path: '', component: IndexComponent },
          { path: 'edit/:id', component: EditComponent },
          { path: ':id', component: ShowComponent },
        ],
      },
    ],
  },
  //?------------------------------------------

  //?userSection-------------------------------
  {
    path: 'profile',
    component: ProfileComponent,
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
  },
  {
    path: 'privacy',
    component: PrivacyPolicyComponent,
  },
  //?-----------------------------------------

  //?NotFound page ---------------------------
  {
    path: '**',
    component: NotFoundComponent,
  },
  //?-----------------------------------------
];
