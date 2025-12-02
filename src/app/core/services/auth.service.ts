import { Injectable, signal, computed, inject } from '@angular/core';
import { ApiService } from './api.service';
import { LoginRequest, LoginResponse, RegisterRequest } from '../models/auth.model';
import { User } from '../models/user.model';
import { API_CONFIG } from '../config/api.config';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiService = inject(ApiService);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  private currentUserSignal = signal<User | null>(null);
  readonly currentUser = this.currentUserSignal.asReadonly();
  readonly isAuthenticated = computed(() => !!this.currentUserSignal());

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.currentUserSignal.set(JSON.parse(storedUser));
      }
    }
  }

  login(credentials: LoginRequest) {
    return this.apiService.post<LoginResponse>(API_CONFIG.endpoints.auth.login, credentials).pipe(
      tap((response) => {
        this.setSession(response);
      })
    );
  }

  register(data: RegisterRequest) {
    return this.apiService.post<void>(API_CONFIG.endpoints.auth.register, data);
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    this.currentUserSignal.set(null);
    this.router.navigate(['/identity/login']);
  }

  private setSession(authResult: LoginResponse) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', authResult.token);
      localStorage.setItem('user', JSON.stringify(authResult.user));
    }
    this.currentUserSignal.set(authResult.user);
  }

  getToken() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }
}
