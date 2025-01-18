import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AppComponent } from './app.component';

import { AdminGuard } from './auth/admin.guard';
import { UserGuard } from './auth/user.guard';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { AddProductComponent } from './components/add-product/add-product.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  { path: 'home', component: HomeComponent, canActivate: [UserGuard] },
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [UserGuard],
    canActivateChild: [UserGuard],
    children: [
      {
        path: 'add-category',
        component: AddCategoryComponent,
      },
      {
        path: ':id',
        component: EditCategoryComponent,
      },
    ],
  },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [UserGuard],
    canActivateChild: [UserGuard],
    children: [
      {
        path: 'add-product',
        component: AddProductComponent,
      },
      { path: ':id', component: EditProductComponent },
    ],
  },

  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];
