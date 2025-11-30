import { Routes } from '@angular/router';
import { IndexComponent } from './book/index/index.component';
import { CreateComponent } from './book/create/create.component';

export const ADMIN_ROUTES: Routes = [
  { path: 'books', component: IndexComponent },
  { path: 'books/create', component: CreateComponent },
  { path: '', redirectTo: 'books', pathMatch: 'full' },
];
