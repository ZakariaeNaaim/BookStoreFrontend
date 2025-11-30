import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const expectedRole = route.data['role'];

  const user = authService.currentUser();

  if (user && user.role === expectedRole) {
    return true;
  }

  // Redirect to access denied or home
  return router.createUrlTree(['/identity/access-denied']);
};
