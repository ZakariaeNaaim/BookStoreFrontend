import { Routes } from '@angular/router';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookUpsertComponent } from './books/book-upsert/book-upsert.component';
import { BookDetailsComponent } from './books/book-details/book-details.component';
import { BookDeleteComponent } from './books/book-delete/book-delete.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { CategoryUpsertComponent } from './categories/category-upsert/category-upsert.component';
import { CategoryDetailsComponent } from './categories/category-details/category-details.component';
import { CategoryDeleteComponent } from './categories/category-delete/category-delete.component';
import { CompanyListComponent } from './companies/company-list/company-list.component';
import { CompanyUpsertComponent } from './companies/company-upsert/company-upsert.component';
import { CompanyDeleteComponent } from './companies/company-delete/company-delete.component';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserRoleManagementComponent } from './users/user-role-management/user-role-management.component';

export const ADMIN_ROUTES: Routes = [
  { path: 'books', component: BookListComponent },
  { path: 'books/create', component: BookUpsertComponent },
  { path: 'books/edit/:id', component: BookUpsertComponent },
  { path: 'books/details/:id', component: BookDetailsComponent },
  { path: 'books/delete/:id', component: BookDeleteComponent },
  { path: 'categories', component: CategoryListComponent },
  { path: 'categories/create', component: CategoryUpsertComponent },
  { path: 'categories/edit/:id', component: CategoryUpsertComponent },
  { path: 'categories/details/:id', component: CategoryDetailsComponent },
  { path: 'categories/delete/:id', component: CategoryDeleteComponent },
  { path: 'companies', component: CompanyListComponent },
  { path: 'companies/create', component: CompanyUpsertComponent },
  { path: 'companies/edit/:id', component: CompanyUpsertComponent },
  { path: 'companies/delete/:id', component: CompanyDeleteComponent },
  { path: 'orders', component: OrderListComponent },
  { path: 'orders/details/:id', component: OrderDetailsComponent },
  { path: 'users', component: UserListComponent },
  { path: 'users/role-management/:userId', component: UserRoleManagementComponent },
  { path: '', redirectTo: 'books', pathMatch: 'full' },
];
