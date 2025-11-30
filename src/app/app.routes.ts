import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'customer',
        loadChildren: () => import('./features/customer/routes').then((m) => m.CUSTOMER_ROUTES),
      },
      {
        path: 'admin',
        loadChildren: () => import('./features/admin/routes').then((m) => m.ADMIN_ROUTES),
        canActivate: [authGuard, roleGuard],
        data: { role: 'Admin' },
      },
      {
        path: '',
        redirectTo: 'customer',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'identity',
    loadChildren: () => import('./features/identity/routes').then((m) => m.IDENTITY_ROUTES),
  },
  {
    path: '**',
    redirectTo: 'customer',
  },
];
