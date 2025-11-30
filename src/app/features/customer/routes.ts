import { Routes } from '@angular/router';
import { IndexComponent } from './home/index/index.component';
import { DetailsComponent } from './home/details/details.component';

export const CUSTOMER_ROUTES: Routes = [
  { path: 'home', component: IndexComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
