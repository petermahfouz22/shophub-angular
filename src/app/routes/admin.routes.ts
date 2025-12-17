import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'admin',
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('../roles/Admin/admin-dashboard/admin-dashboard.component')
            .then(m => m.AdminDashboardComponent)
      },

      {
        path: 'orders',
        loadComponent: () =>
          import('../roles/Admin/manage-orders/manage-orders.component')
            .then(m => m.ManageOrdersComponent)
      },

      // 🚀 Manage Products (Lazy loaded)
      {
        path: 'products',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('../roles/Admin/manage-products/all-products/all-products.component')
                .then(m => m.AllProductsComponent)
          },
          {
            path: 'create',
            loadComponent: () =>
              import('../roles/Admin/manage-products/add-product/new-product.component')
                .then(m => m.NewProductComponent)
          },
          {
            path: 'edit/:id',
            loadComponent: () =>
              import('../roles/Admin/manage-products/edit-product/edit-product.component')
                .then(m => m.EditProductComponent)
          },
          {
            path: ':id',
            loadComponent: () =>
              import('../roles/Admin/manage-products/show-product/show-product.component')
                .then(m => m.ShowProductComponent)
          }
        ]
      },

      // 🚀 Manage Categories
      {
        path: 'categories',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('../roles/Admin/manage-categories/all-categories/all-categories.component')
                .then(m => m.AllCategoriesComponent)
          },
          {
            path: 'create',
            loadComponent: () =>
              import('../roles/Admin/manage-categories/new-category/new-category.component')
                .then(m => m.NewCategoryComponent)
          },
          {
            path: 'edit/:id',
            loadComponent: () =>
              import('../roles/Admin/manage-categories/edit-category/edit-category.component')
                .then(m => m.EditCategoryComponent)
          }
        ]
      },

      // 🚀 Manage Brands
      {
        path: 'brands',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('../roles/Admin/manage-brands/index/all-brands.component')
                .then(m => m.AllBrandsComponent)
          },
          {
            path: 'create',
            loadComponent: () =>
              import('../roles/Admin/manage-brands/create/new-brand.component')
                .then(m => m.NewBrandComponent)
          },
          {
            path: 'edit/:id',
            loadComponent: () =>
              import('../roles/Admin/manage-brands/edit/edit-brand.component')
                .then(m => m.EditBrandComponent)
          }
        ]
      },

      // 🚀 Manage Users
      {
        path: 'users',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('../roles/Admin/manage-users/index/index.component')
                .then(m => m.IndexComponent)
          },
          {
            path: 'edit/:id',
            loadComponent: () =>
              import('../roles/Admin/manage-users/edit/edit.component')
                .then(m => m.EditComponent)
          },
          {
            path: ':id',
            loadComponent: () =>
              import('../roles/Admin/manage-users/show/show.component')
                .then(m => m.ShowComponent)
          }
        ]
      }

    ]
  }
];



// import { Routes } from '@angular/router';
// import { NewProductComponent } from '../roles/Admin/manage-products/add-product/new-product.component';
// import { AllProductsComponent } from '../roles/Admin/manage-products/all-products/all-products.component';
// import { EditProductComponent } from '../roles/Admin/manage-products/edit-product/edit-product.component';
// import { ShowProductComponent } from '../roles/Admin/manage-products/show-product/show-product.component';
// import { EditComponent } from '../roles/Admin/manage-users/edit/edit.component';
// import { ShowComponent } from '../roles/Admin/manage-users/show/show.component';
// import { AllCategoriesComponent } from '../roles/Admin/manage-categories/all-categories/all-categories.component';
// import { NewCategoryComponent } from '../roles/Admin/manage-categories/new-category/new-category.component';
// import { EditCategoryComponent } from '../roles/Admin/manage-categories/edit-category/edit-category.component';
// import { AllBrandsComponent } from '../roles/Admin/manage-brands/index/all-brands.component';
// import { NewBrandComponent } from '../roles/Admin/manage-brands/create/new-brand.component';
// import { EditBrandComponent } from '../roles/Admin/manage-brands/edit/edit-brand.component';
// import { ManageOrdersComponent } from '../roles/Admin/manage-orders/manage-orders.component';
// import { IndexComponent } from '../roles/Admin/manage-users/index/index.component';

// export const routes: Routes = [
//   {
//     path: 'admin',
//     children: [
//       {
//         path: 'dashboard',
//         loadComponent: () =>
//           import(
//             '../roles/Admin/admin-dashboard/admin-dashboard.component'
//           ).then((m) => m.AdminDashboardComponent),
//       },
//       {
//         path: 'orders',
//         component: ManageOrdersComponent,
//       },
//       {
//         //?--------------------manage-products--------------------
//         path: 'products',
//         children: [
//           { path: '', component: AllProductsComponent },
//           { path: 'create', component: NewProductComponent },
//           { path: 'edit/:id', component: EditProductComponent },
//           { path: ':id', component: ShowProductComponent },
//         ],
//       },
//       // ... other routes
//       {
//         path: 'categories',
//         children: [
//           { path: '', component: AllCategoriesComponent },
//           { path: 'create', component: NewCategoryComponent },
//           { path: 'edit/:id', component: EditCategoryComponent },
//           // {path:':id',component:ShowCategoryComponent}
//         ],
//       },
//       {
//         path: 'brands',
//         children: [
//           { path: '', component: AllBrandsComponent },
//           { path: 'create', component: NewBrandComponent },
//           { path: 'edit/:id', component: EditBrandComponent },
//         ],
//       },
//       {
//         //?--------------------manage-users--------------------
//         path: 'users',
//         children: [
//           { path: '', component: IndexComponent },
//           { path: 'edit/:id', component: EditComponent },
//           { path: ':id', component: ShowComponent },
//         ],
//       },
//     ],
//   },
// ];
