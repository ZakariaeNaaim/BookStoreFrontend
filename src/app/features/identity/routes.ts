import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthCallbackComponent } from './pages/auth-callback/auth-callback.component';

export const IDENTITY_ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'auth-callback', component: AuthCallbackComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
