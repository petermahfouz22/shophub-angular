import { Routes } from '@angular/router';

export const routes: Routes = [
  // 💠 Home
  {
    path: 'home',
    loadComponent: () =>
      import('../home/home.component').then(m => m.HomeComponent),
    data: { wantSearch: true }
  },

  // 💠 Products list
  {
    path: 'products',
    loadComponent: () =>
      import('../products/products.component').then(m => m.ProductsComponent),
    data: { wantSearch: true }
  },

  // 💠 Product Details
  {
    path: 'products/:id',
    loadComponent: () =>
      import('../products/product-details/product-details.component')
        .then(m => m.ProductDetailsComponent),
    data: { wantSearch: true }
  },

  // 💠 Favorite
  {
    path: 'favorites',
    loadComponent: () =>
      import('../products/favorite-products/favorite-products.component')
        .then(m => m.FavoriteProductsComponent),
  },

  // 💠 Cart
  {
    path: 'cart',
    loadComponent: () =>
      import('../products/cart/cart.component')
        .then(m => m.CartComponent),
  },

  // 💠 Payment
  {
    path: 'payment',
    loadComponent: () =>
      import('../payment/payment.component')
        .then(m => m.PaymentComponent),
  },

  // 💠 FAQ
  {
    path: 'faq',
    loadComponent: () =>
      import('../support/faq/faq.component')
        .then(m => m.FAQComponent),
  },

  // 💠 Contact us
  {
    path: 'contact-us',
    loadComponent: () =>
      import('../support/contact-us/contact-us.component')
        .then(m => m.ContactUsComponent),
  },

  // 💠 Terms
  {
    path: 'terms',
    loadComponent: () =>
      import('../informations/terms-condtions/terms-condtions.component')
        .then(m => m.TermsConditionsComponent),
  },

  // 💠 Privacy
  {
    path: 'privacy',
    loadComponent: () =>
      import('../informations/privacy-policy/privacy-policy.component')
        .then(m => m.PrivacyPolicyComponent),
  },
];



// import { Routes } from '@angular/router';

// import { ProductsComponent } from '../products/products.component';
// // import { AuthGuard } from './guards/auth.guard';
// // import { roleGuard } from './guards/role.guard';
// import {
//   ProductDetailsComponent,
//   // resolvePoductData,
// } from '../products/product-details/product-details.component';
// import { HomeComponent } from '../home/home.component';
// import { CartComponent } from '../products/cart/cart.component';

// import { FavoriteProductsComponent } from '../products/favorite-products/favorite-products.component';
// import { PaymentComponent } from '../payment/payment.component';
// import { ContactUsComponent } from '../support/contact-us/contact-us.component';

// import { FAQComponent } from '../support/faq/faq.component';

// import { TermsConditionsComponent } from '../informations/terms-condtions/terms-condtions.component';

// import { PrivacyPolicyComponent } from '../informations/privacy-policy/privacy-policy.component';

// export const routes: Routes = [
//   //?home(customer)--------------------------------------
//   {
//     path: 'home',
//     component: HomeComponent,
//     data: {
//       wantSearch: true,
//     },
//   },

//   //?products----------------------------------
//   {
//     path: 'products',
//     component: ProductsComponent,
//     data: {
//       wantSearch: true,
//     },
//   },
//   {
//     path: 'products/:id',
//     component: ProductDetailsComponent,
//     data: {
//       wantSearch: true,
//     },
//     // resolve: {productData:resolvePoductData},
//   },
//   //?storage products--------------------------
//   {
//     path: 'favorites',
//     component: FavoriteProductsComponent,
//   },
//   { path: 'cart', component: CartComponent },
//   //?------------------------------------------
//   //?payment-----------------------------------
//   {
//     path: 'payment',
//     component: PaymentComponent,
//   }, //?Support---------------------------------
//   { path: 'faq', component: FAQComponent },
//   { path: 'contact-us', component: ContactUsComponent },

//   //?Information-----------------------------
//   {
//     path: 'terms',
//     component: TermsConditionsComponent,
//   },
//   {
//     path: 'privacy',
//     component: PrivacyPolicyComponent,
//   },
//   //?-----------------------------------------
// ];
