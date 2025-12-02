import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomeDetailsComponent } from './home/home-details/home-details.component';
import { CartComponent } from './cart/cart.component';
import { CartSummaryComponent } from './cart/cart-summary/cart-summary.component';
import { OrderConfirmationComponent } from './cart/order-confirmation/order-confirmation.component';

export const CUSTOMER_ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'details/:id', component: HomeDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'cart/summary', component: CartSummaryComponent },
  { path: 'order-confirmation/:id', component: OrderConfirmationComponent },
];
